import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { GraduationCap, LogOut, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimetableManagement from "@/components/TimetableManagement";
import FinancialReceipts from "@/components/FinancialReceipts";
import AnnouncementsPanel from "@/components/AnnouncementsPanel";
import PermissionsPanel from "@/components/PermissionsPanel";
import ClassManagement from "@/components/ClassManagement";
import StatsOverview from "@/components/StatsOverview";

interface Props {
  session: Session;
}

interface UserProfile {
  id: string;
  nom: string;
  prenom: string;
  role: string;
  ecole_id: string | null;
  email: string;
}

export default function Dashboard({ session }: Props) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [session]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("utilisateurs_ecole_monecole2")
        .select("*")
        .eq("auth_user_id", session.user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Profile error:", error);
      }
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnexion réussie");
  };

  const role = profile?.role || "direction";
  const userName = profile ? `${profile.prenom} ${profile.nom}` : session.user.email;

  const getRoleBadgeColor = (r: string) => {
    const colors: Record<string, string> = {
      direction: "bg-primary/10 text-primary",
      censeur: "bg-purple-100 text-purple-700",
      educateur: "bg-orange-100 text-orange-700",
      secretariat: "bg-blue-100 text-blue-700",
      rh: "bg-green-100 text-green-700",
      econome: "bg-yellow-100 text-yellow-700",
      enseignant: "bg-indigo-100 text-indigo-700",
      eleve: "bg-pink-100 text-pink-700",
      parent: "bg-rose-100 text-rose-700",
    };
    return colors[r] || "bg-muted text-muted-foreground";
  };

  const getRoleLabel = (r: string) => {
    const labels: Record<string, string> = {
      direction: "Direction",
      censeur: "Censeur",
      educateur: "Éducateur",
      secretariat: "Secrétariat",
      rh: "RH",
      econome: "Économe",
      enseignant: "Enseignant",
      eleve: "Élève",
      parent: "Parent",
    };
    return labels[r] || r;
  };

  const canManageClasses = ["direction", "censeur", "secretariat"].includes(role);
  const canManageTimetable = ["direction", "censeur", "educateur", "secretariat"].includes(role);
  const canManageFinance = ["econome", "rh", "direction"].includes(role);
  const canManageAnnouncements = ["secretariat", "direction", "censeur"].includes(role);
  const isStudentOrParent = ["eleve", "parent"].includes(role);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-foreground hidden sm:block">Mon École</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground leading-none">{userName}</p>
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${getRoleBadgeColor(role)}`}>
                  {getRoleLabel(role)}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Déconnexion">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        {/* Stats */}
        <div className="mb-6">
          <StatsOverview role={role} ecoleId={profile?.ecole_id || null} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue={isStudentOrParent ? "receipts" : "overview"} className="space-y-4">
          <TabsList className="flex-wrap h-auto gap-1 bg-muted p-1">
            {!isStudentOrParent && (
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            )}
            {canManageTimetable && (
              <TabsTrigger value="timetable">Emplois du temps</TabsTrigger>
            )}
            {isStudentOrParent && (
              <TabsTrigger value="timetable">Mon emploi du temps</TabsTrigger>
            )}
            {canManageFinance && (
              <TabsTrigger value="receipts">Reçus financiers</TabsTrigger>
            )}
            {isStudentOrParent && (
              <TabsTrigger value="receipts">Mes reçus</TabsTrigger>
            )}
            {canManageAnnouncements && (
              <TabsTrigger value="announcements">Communiqués</TabsTrigger>
            )}
            {isStudentOrParent && (
              <TabsTrigger value="announcements">Communiqués</TabsTrigger>
            )}
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            {canManageClasses && (
              <TabsTrigger value="classes">Gestion des classes</TabsTrigger>
            )}
          </TabsList>

          {!isStudentOrParent && (
            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-2">
                <AnnouncementsPanel role={role} ecoleId={profile?.ecole_id || null} userId={profile?.id || ""} readOnly />
                <PermissionsPanel role={role} ecoleId={profile?.ecole_id || null} userId={profile?.id || ""} />
              </div>
            </TabsContent>
          )}

          <TabsContent value="timetable">
            <TimetableManagement role={role} ecoleId={profile?.ecole_id || null} userId={profile?.id || ""} />
          </TabsContent>

          <TabsContent value="receipts">
            <FinancialReceipts role={role} ecoleId={profile?.ecole_id || null} userId={profile?.id || ""} />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsPanel role={role} ecoleId={profile?.ecole_id || null} userId={profile?.id || ""} />
          </TabsContent>

          <TabsContent value="permissions">
            <PermissionsPanel role={role} ecoleId={profile?.ecole_id || null} userId={profile?.id || ""} />
          </TabsContent>

          {canManageClasses && (
            <TabsContent value="classes">
              <ClassManagement role={role} ecoleId={profile?.ecole_id || null} userId={profile?.id || ""} />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}
