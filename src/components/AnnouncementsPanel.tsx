import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Plus, Megaphone, AlertTriangle, Clock } from "lucide-react";

interface Props {
  role: string;
  ecoleId: string | null;
  userId: string;
  readOnly?: boolean;
}

interface Annonce {
  id: string;
  titre: string;
  contenu: string;
  urgent: boolean | null;
  created_at: string | null;
}

export default function AnnouncementsPanel({ role, ecoleId, userId, readOnly = false }: Props) {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [saving, setSaving] = useState(false);

  const canCreate = ["secretariat", "direction", "censeur"].includes(role) && !readOnly;

  useEffect(() => {
    fetchAnnonces();
  }, [ecoleId]);

  const fetchAnnonces = async () => {
    try {
      let query = supabase.from("annonces_monecole2").select("*").order("created_at", { ascending: false }).limit(20);
      if (ecoleId) query = query.eq("ecole_id", ecoleId);
      const { data, error } = await query;
      if (error) throw error;
      setAnnonces(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!titre.trim() || !contenu.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.from("annonces_monecole2").insert({
        titre,
        contenu,
        urgent,
        ecole_id: ecoleId,
        auteur_id: userId,
      });
      if (error) throw error;
      toast.success("Communiqué publié !");
      setTitre(""); setContenu(""); setUrgent(false); setShowForm(false);
      fetchAnnonces();
    } catch (err: unknown) {
      toast.error("Erreur lors de la publication");
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (d: string | null) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Communiqués</h2>
          <Badge variant="secondary">{annonces.length}</Badge>
        </div>
        {canCreate && (
          <Button size="sm" onClick={() => setShowForm(!showForm)} className="gradient-primary text-white border-0 gap-1">
            <Plus className="w-4 h-4" /> Nouveau
          </Button>
        )}
      </div>

      {canCreate && showForm && (
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Nouveau communiqué</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Titre</Label>
              <Input placeholder="Titre du communiqué" value={titre} onChange={(e) => setTitre(e.target.value)} />
            </div>
            <div>
              <Label>Contenu</Label>
              <Textarea placeholder="Contenu du communiqué..." value={contenu} onChange={(e) => setContenu(e.target.value)} rows={4} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="urgent" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="rounded" />
              <Label htmlFor="urgent" className="cursor-pointer">Marquer comme urgent</Label>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleCreate} disabled={saving} className="gradient-primary text-white border-0">Publier</Button>
              <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : annonces.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Bell className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Aucun communiqué pour l'instant</p>
        </div>
      ) : (
        <div className="space-y-3">
          {annonces.map((a) => (
            <Card key={a.id} className={`border ${a.urgent ? "border-destructive/30 bg-destructive/5" : "border-border"}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {a.urgent && <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />}
                    <h3 className="font-medium text-foreground">{a.titre}</h3>
                  </div>
                  {a.urgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{a.contenu}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {formatDate(a.created_at)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
