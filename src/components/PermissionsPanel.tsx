import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardList, Plus, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface Props {
  role: string;
  ecoleId: string | null;
  userId: string;
}

interface Permission {
  id: string;
  motif: string;
  type_demande: string;
  status: string | null;
  date_debut: string;
  date_fin: string | null;
  created_at: string | null;
  commentaire_reponse: string | null;
}

export default function PermissionsPanel({ role, ecoleId, userId }: Props) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [motif, setMotif] = useState("");
  const [type, setType] = useState("absence_eleve");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [saving, setSaving] = useState(false);

  const canRequest = ["eleve", "parent", "enseignant"].includes(role);
  const canApprove = ["direction", "censeur", "educateur"].includes(role);

  useEffect(() => {
    fetchPermissions();
  }, [ecoleId, userId]);

  const fetchPermissions = async () => {
    try {
      let query = supabase.from("demandes_permission_monecole2").select("*").order("created_at", { ascending: false });
      if (canRequest && userId) {
        query = query.eq("demandeur_id", userId);
      } else if (ecoleId) {
        query = query.eq("ecole_id", ecoleId);
      }
      const { data, error } = await query;
      if (error) throw error;
      setPermissions(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!motif || !dateDebut) {
      toast.error("Renseignez le motif et la date de début");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.from("demandes_permission_monecole2").insert({
        motif,
        type_demande: type,
        date_debut: dateDebut,
        date_fin: dateFin || null,
        demandeur_id: userId,
        ecole_id: ecoleId,
        status: "en_attente",
      });
      if (error) throw error;
      toast.success("Demande soumise !");
      setMotif(""); setDateDebut(""); setDateFin(""); setShowForm(false);
      fetchPermissions();
    } catch {
      toast.error("Erreur lors de la soumission");
    } finally {
      setSaving(false);
    }
  };

  const handleApprove = async (id: string, approved: boolean) => {
    try {
      const { error } = await supabase.from("demandes_permission_monecole2").update({
        status: approved ? "approuvee" : "refusee",
        traite_par_id: userId,
      }).eq("id", id);
      if (error) throw error;
      toast.success(approved ? "Demande approuvée" : "Demande refusée");
      fetchPermissions();
    } catch {
      toast.error("Erreur");
    }
  };

  const statusBadge = (s: string | null) => {
    switch (s) {
      case "approuvee": return <Badge className="bg-green-100 text-green-700 border-0"><CheckCircle className="w-3 h-3 mr-1" />Approuvée</Badge>;
      case "refusee": return <Badge className="bg-red-100 text-red-700 border-0"><XCircle className="w-3 h-3 mr-1" />Refusée</Badge>;
      default: return <Badge className="bg-yellow-100 text-yellow-700 border-0"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Permissions</h2>
          <Badge variant="secondary">{permissions.length}</Badge>
        </div>
        {canRequest && (
          <Button size="sm" onClick={() => setShowForm(!showForm)} className="gradient-primary text-white border-0 gap-1">
            <Plus className="w-4 h-4" /> Demande
          </Button>
        )}
      </div>

      {canRequest && showForm && (
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Nouvelle demande de permission</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Type de demande</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="absence_eleve">Absence élève</SelectItem>
                  <SelectItem value="absence_enseignant">Absence enseignant</SelectItem>
                  <SelectItem value="sortie_anticipee">Sortie anticipée</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Motif</Label>
              <Textarea placeholder="Motif de la demande..." value={motif} onChange={(e) => setMotif(e.target.value)} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Date de début</Label>
                <Input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
              </div>
              <div>
                <Label>Date de fin (optionnel)</Label>
                <Input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleCreate} disabled={saving} className="gradient-primary text-white border-0">Soumettre</Button>
              <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : permissions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Aucune demande de permission</p>
        </div>
      ) : (
        <div className="space-y-3">
          {permissions.map((p) => (
            <Card key={p.id} className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-medium text-foreground text-sm">{p.type_demande.replace(/_/g, " ")}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.motif}</p>
                  </div>
                  {statusBadge(p.status)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Du {new Date(p.date_debut).toLocaleDateString("fr-FR")}
                  {p.date_fin ? ` au ${new Date(p.date_fin).toLocaleDateString("fr-FR")}` : ""}
                </p>
                {canApprove && p.status === "en_attente" && (
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" onClick={() => handleApprove(p.id, true)} className="bg-green-600 hover:bg-green-700 text-white border-0 text-xs h-7">
                      <CheckCircle className="w-3 h-3 mr-1" /> Approuver
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleApprove(p.id, false)} className="text-xs h-7">
                      <XCircle className="w-3 h-3 mr-1" /> Refuser
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
