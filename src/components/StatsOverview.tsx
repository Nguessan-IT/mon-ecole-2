import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Calendar, FileText } from "lucide-react";

interface Props {
  role: string;
  ecoleId: string | null;
}

export default function StatsOverview({ role, ecoleId }: Props) {
  const [stats, setStats] = useState({ eleves: 0, enseignants: 0, classes: 0, annonces: 0 });

  useEffect(() => {
    if (!ecoleId) return;
    loadStats();
  }, [ecoleId]);

  const loadStats = async () => {
    const [eleves, enseignants, classes, annonces] = await Promise.all([
      supabase.from("utilisateurs_ecole_monecole2").select("id", { count: "exact", head: true }).eq("ecole_id", ecoleId!).eq("type_utilisateur", "eleve"),
      supabase.from("utilisateurs_ecole_monecole2").select("id", { count: "exact", head: true }).eq("ecole_id", ecoleId!).eq("type_utilisateur", "enseignant"),
      supabase.from("classes_monecole2").select("id", { count: "exact", head: true }).eq("ecole_id", ecoleId!),
      supabase.from("annonces_monecole2").select("id", { count: "exact", head: true }).eq("ecole_id", ecoleId!),
    ]);
    setStats({
      eleves: eleves.count || 0,
      enseignants: enseignants.count || 0,
      classes: classes.count || 0,
      annonces: annonces.count || 0,
    });
  };

  const cards = [
    { title: "Élèves", value: stats.eleves, icon: Users, color: "text-primary" },
    { title: "Enseignants", value: stats.enseignants, icon: BookOpen, color: "text-primary" },
    { title: "Classes", value: stats.classes, icon: Calendar, color: "text-primary" },
    { title: "Communiqués", value: stats.annonces, icon: FileText, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-foreground">Tableau de bord</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card key={c.title} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{c.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
