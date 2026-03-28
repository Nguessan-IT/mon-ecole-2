import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Bell } from "lucide-react";

interface Props {
  role: string;
  ecoleId: string | null;
  userId: string;
}

export default function AnnouncementsPanel({ role, ecoleId, userId }: Props) {
  const [annonces, setAnnonces] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [loading, setLoading] = useState(false);

  const canCreate = ["direction", "censeur", "secretariat", "educateur"].includes(role);

  useEffect(() => {
    if (ecoleId) loadAnnonces();
  }, [ecoleId]);

  const loadAnnonces = async () => {
    const { data } = await supabase
      .from("annonces_monecole2")
      .select("*")
      .eq("ecole_id", ecoleId!)
      .order("created_at", { ascending: false });
    if (data) setAnnonces(data);
  };

  const createAnnonce = async () => {
    if (!titre || !contenu) { toast.error("Remplissez tous les champs"); return; }
    setLoading(true);
    const { error } = await supabase.from("annonces_monecole2").insert({
      titre, contenu, auteur_id: userId, ecole_id: ecoleId,
    });
    if (error) { toast.error("Erreur: " + error.message); }
    else { toast.success("Communiqué créé !"); setTitre(""); setContenu(""); setShowForm(false); loadAnnonces(); }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-foreground">Communiqués</h2>
        {canCreate && (
          <Button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" /> Nouveau
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="glass-card">
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label>Titre</Label>
              <Input value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Titre du communiqué" />
            </div>
            <div>
              <Label>Contenu</Label>
              <Textarea value={contenu} onChange={(e) => setContenu(e.target.value)} placeholder="Contenu..." rows={4} />
            </div>
            <Button onClick={createAnnonce} disabled={loading} className="gradient-primary text-primary-foreground">
              {loading ? "Envoi..." : "Publier"}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {annonces.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Aucun communiqué pour le moment.</p>
        ) : (
          annonces.map((a) => (
            <Card key={a.id} className="glass-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{a.titre}</CardTitle>
                  {a.urgent && <Badge variant="destructive">Urgent</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">{a.contenu}</p>
                <p className="text-xs text-muted-foreground mt-3">
                  {new Date(a.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
