import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, LogOut, Users, Calendar, FileText, Bell, ClipboardList, Receipt, BookOpen } from "lucide-react";
import StatsOverview from "@/components/StatsOverview";
import AnnouncementsPanel from "@/components/AnnouncementsPanel";
import PermissionsPanel from "@/components/PermissionsPanel";
import FinancialReceipts from "@/components/FinancialReceipts";
import TimetableManagement from "@/components/TimetableManagement";
import ClassManagement from "@/components/ClassManagement";

interface UserProfile {
  id: string;
  nom: string;
  prenom: string;
  type_utilisateur: string;
  ecole_id: string | null;
  email: string | null;
}

interface EcoleInfo {
  id: string;
  nom: string;
}

export default function Dashboard({ session }: { session: Session | null }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [ecole, setEcole] = useState<EcoleInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) return;
    loadProfile();
  }, [session]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("utilisateurs_ecole_monecole2")
        .select("*")
        .eq("user_id", session!.user.id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setProfile(data as UserProfile);
        if (data.ecole_id) {
          const { data: ecoleData } = await supabase
            .from("ecoles_monecole2")
            .select("id, nom")
            .eq("id", data.ecole_id)
            .single();
          if (ecoleData) setEcole(ecoleData);
        }
      }
    } catch (err) {
      console.error("Erreur chargement profil:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast.success("Déconnexion réussie");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  const role = profile?.type_utilisateur || "eleve";
  const roleName: Record<string, string> = {
    direction: "Directeur", censeur: "Censeur", educateur: "Éducateur",
    secretariat: "Secrétariat", econome: "Économe", enseignant: "Enseignant",
    eleve: "Élève", parent: "Parent",
  };

  // Define which tabs each role sees
  const tabConfig: Record<string, { value: string; label: string; icon: React.ReactNode }[]> = {
    direction: [
      { value: "stats", label: "Tableau de bord", icon: <BookOpen className="h-4 w-4" /> },
      { value: "annonces", label: "Communiqués", icon: <Bell className="h-4 w-4" /> },
      { value: "permissions", label: "Permissions", icon: <ClipboardList className="h-4 w-4" /> },
      { value: "recus", label: "Reçus financiers", icon: <Receipt className="h-4 w-4" /> },
      { value: "emplois", label: "Emplois du temps", icon: <Calendar className="h-4 w-4" /> },
      { value: "classes", label: "Gestion classes", icon: <Users className="h-4 w-4" /> },
    ],
    censeur: [
      { value: "stats", label: "Tableau de bord", icon: <BookOpen className="h-4 w-4" /> },
      { value: "annonces", label: "Communiqués", icon: <Bell className="h-4 w-4" /> },
      { value: "permissions", label: "Permissions", icon: <ClipboardList className="h-4 w-4" /> },
      { value: "emplois", label: "Emplois du temps", icon: <Calendar className="h-4 w-4" /> },
      { value: "classes", label: "Gestion classes", icon: <Users className="h-4 w-4" /> },
    ],
    educateur: [
      { value: "stats", label: "Tableau de bord", icon: <BookOpen className="h-4 w-4" /> },
      { value: "annonces", label: "Communiqués", icon: <Bell className="h-4 w-4" /> },
      { value: "permissions", label: "Permissions", icon: <ClipboardList className="h-4 w-4" /> },
      { value: "emplois", label: "Emplois du temps", icon: <Calendar className="h-4 w-4" /> },
    ],
    secretariat: [
      { value: "stats", label: "Tableau de bord", icon: <BookOpen className="h-4 w-4" /> },
      { value: "annonces", label: "Communiqués", icon: <Bell className="h-4 w-4" /> },
      { value: "permissions", label: "Permissions", icon: <ClipboardList className="h-4 w-4" /> },
      { value: "emplois", label: "Emplois du temps", icon: <Calendar className="h-4 w-4" /> },
      { value: "classes", label: "Gestion classes", icon: <Users className="h-4 w-4" /> },
    ],
    econome: [
      { value: "stats", label: "Tableau de bord", icon: <BookOpen className="h-4 w-4" /> },
      { value: "annonces", label: "Communiqués", icon: <Bell className="h-4 w-4" /> },
      { value: "recus", label: "Reçus financiers", icon: <Receipt className="h-4 w-4" /> },
    ],
    enseignant: [
      { value: "stats", label: "Tableau de bord", icon: <BookOpen className="h-4 w-4" /> },
      { value: "annonces", label: "Communiqués", icon: <Bell className="h-4 w-4" /> },
      { value: "permissions", label: "Permissions", icon: <ClipboardList className="h-4 w-4" /> },
      { value: "emplois", label: "Emplois du temps", icon: <Calendar className="h-4 w-4" /> },
    ],
    eleve: [
      { value: "stats", label: "Tableau de bord", icon: <BookOpen className="h-4 w-4" /> },
      { value: "annonces", label: "Communiqués", icon: <Bell className="h-4 w-4" /> },
      { value: "permissions", label: "Permissions", icon: <ClipboardList className="h-4 w-4" /> },
      { value: "recus", label: "Mes reçus", icon: <Receipt className="h-4 w-4" /> },
      { value: "emplois", label: "Emplois du temps", icon: <Calendar className="h-4 w-4" /> },
    ],
    parent: [
      { value: "stats", label: "Tableau de bord", icon: <BookOpen className="h-4 w-4" /> },
      { value: "annonces", label: "Communiqués", icon: <Bell className="h-4 w-4" /> },
      { value: "permissions", label: "Permissions", icon: <ClipboardList className="h-4 w-4" /> },
      { value: "recus", label: "Reçus enfant", icon: <Receipt className="h-4 w-4" /> },
      { value: "emplois", label: "Emplois du temps", icon: <Calendar className="h-4 w-4" /> },
    ],
  };

  const tabs = tabConfig[role] || tabConfig.eleve;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                {ecole?.nom || "Mon École"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {profile?.prenom} {profile?.nom} — {roleName[role] || role}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Déconnexion
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="flex flex-wrap gap-1 h-auto bg-muted p-1 rounded-xl">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground rounded-lg">
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="stats">
            <StatsOverview role={role} ecoleId={ecole?.id || null} />
          </TabsContent>

          <TabsContent value="annonces">
            <AnnouncementsPanel role={role} ecoleId={ecole?.id || null} userId={profile?.id || ""} />
          </TabsContent>

          <TabsContent value="permissions">
            <PermissionsPanel role={role} ecoleId={ecole?.id || null} userId={profile?.id || ""} />
          </TabsContent>

          {tabs.some((t) => t.value === "recus") && (
            <TabsContent value="recus">
              <FinancialReceipts role={role} ecoleId={ecole?.id || null} userId={profile?.id || ""} />
            </TabsContent>
          )}

          {tabs.some((t) => t.value === "emplois") && (
            <TabsContent value="emplois">
              <TimetableManagement role={role} ecoleId={ecole?.id || null} userId={profile?.id || ""} />
            </TabsContent>
          )}

          {tabs.some((t) => t.value === "classes") && (
            <TabsContent value="classes">
              <ClassManagement role={role} ecoleId={ecole?.id || null} userId={profile?.id || ""} />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}
