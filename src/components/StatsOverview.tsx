import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, BookOpen, FileText, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  role: string;
  ecoleId: string | null;
}

interface Stats {
  eleves: number;
  enseignants: number;
  classes: number;
  annonces: number;
}

export default function StatsOverview({ role, ecoleId }: Props) {
  const [stats, setStats] = useState<Stats>({ eleves: 0, enseignants: 0, classes: 0, annonces: 0 });

  useEffect(() => {
    if (!ecoleId) return;
    fetchStats();
  }, [ecoleId]);

  const fetchStats = async () => {
    try {
      const [elevesRes, classesRes, annoncesRes] = await Promise.all([
        supabase.from("utilisateurs_ecole_monecole2").select("id", { count: "exact" }).eq("ecole_id", ecoleId!).eq("role", "eleve"),
        supabase.from("classes_monecole2").select("id", { count: "exact" }).eq("ecole_id", ecoleId!),
        supabase.from("annonces_monecole2").select("id", { count: "exact" }).eq("ecole_id", ecoleId!),
      ]);
      setStats({
        eleves: elevesRes.count || 0,
        enseignants: 0,
        classes: classesRes.count || 0,
        annonces: annoncesRes.count || 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const cards = [
    { label: "Élèves inscrits", value: stats.eleves, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Classes", value: stats.classes, icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Communiqués", value: stats.annonces, icon: FileText, color: "text-green-600", bg: "bg-green-50" },
    { label: "Emplois du temps", value: "—", icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c) => (
        <Card key={c.label} className="border border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
              <c.icon className={`w-5 h-5 ${c.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{c.value}</p>
              <p className="text-xs text-muted-foreground">{c.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
