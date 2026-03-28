import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Check, X } from "lucide-react";

interface Props {
  role: string;
  ecoleId: string | null;
  userId: string;
}

export default function PermissionsPanel({ role, ecoleId, userId }: Props) {
  const [demandes, setDemandes] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [motif, setMotif] = useState("");
  const [typeDemande, setTypeDemande] = useState("absence");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [loading, setLoading] = useState(false);

  // Who can request permissions
  const canRequest = ["eleve", "parent", "enseignant", "educateur", "censeur", "secretariat", "econome"].includes(role);
  // Who can approve
  const canApprove = ["direction", "educateur", "censeur"].includes(role);
  // Secretariat gets copy of approved
  const isSecretariat = role === "secretariat";

  useEffect(() => {
    if (ecoleId) loadDemandes();
  }, [ecoleId]);

  const loadDemandes = async () => {
    let query = supabase
      .from("demandes_permission_monecole2")
      .select("*, demandeur:utilisateurs_ecole_monecole2!demandes_permission_monecole2_demandeur_id_fkey(nom, prenom, type_utilisateur)")
      .eq("ecole_id", ecoleId!)
      .order("created_at", { ascending: false });

    // Eleves/parents see only their own
    if (role === "eleve" || role === "parent") {
      query = query.eq("demandeur_id", userId);
    }
    // Educateurs see student requests
    if (role === "educateur") {
      // See all - filter in UI if needed
    }
    // Direction sees staff requests
    // Secretariat sees approved copies

    const { data } = await query;
    if (data) {
      let filtered = data;
      if (role === "educateur") {
        // Educateur sees student/parent requests
        filtered = data.filter((d: any) =>
          d.demandeur?.type_utilisateur === "eleve" || d.demandeur?.type_utilisateur === "parent"
        );
      }
      if (role === "direction") {
        // Direction sees staff requests (enseignant, educateur, censeur, secretariat, econome)
        filtered = data.filter((d: any) =>
          ["enseignant", "educateur", "censeur", "secretariat", "econome"].includes(d.demandeur?.type_utilisateur || "")
        );
      }
      if (isSecretariat) {
        // Secretariat sees approved copies
        filtered = data.filter((d: any) => d.status === "approuvee");
      }
      setDemandes(filtered);
    }
  };

  const createDemande = async () => {
    if (!motif || !dateDebut) { toast.error("Remplissez tous les champs obligatoires"); return; }
    setLoading(true);
    const { error } = await supabase.from("demandes_permission_monecole2").insert({
      demandeur_id: userId, ecole_id: ecoleId, motif, type_demande: typeDemande,
      date_debut: dateDebut, date_fin: dateFin || null,
    });
    if (error) toast.error("Erreur: " + error.message);
    else { toast.success("Demande envoyée !"); setMotif(""); setDateDebut(""); setDateFin(""); setShowForm(false); loadDemandes(); }
    setLoading(false);
  };

  const handleDecision = async (id: string, status: "approuve" | "refuse") => {
    const { error } = await supabase.from("demandes_permission_monecole2")
      .update({ status, traite_par_id: userId })
      .eq("id", id);
    if (error) toast.error("Erreur: " + error.message);
    else { toast.success(`Demande ${status === "approuve" ? "approuvée" : "refusée"}`); loadDemandes(); }
  };

  const statusBadge = (status: string) => {
    const map: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
      en_attente: { label: "En attente", variant: "secondary" },
      approuve: { label: "Approuvée", variant: "default" },
      refuse: { label: "Refusée", variant: "destructive" },
    };
    const s = map[status] || map.en_attente;
    return <Badge variant={s.variant}>{s.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-foreground">Permissions</h2>
        {canRequest && (
          <Button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" /> Nouvelle demande
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="glass-card">
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label>Type de demande</Label>
              <Select value={typeDemande} onValueChange={setTypeDemande}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="absence">Absence</SelectItem>
                  <SelectItem value="retard">Retard</SelectItem>
                  <SelectItem value="sortie">Sortie anticipée</SelectItem>
                  <SelectItem value="conge">Congé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date début</Label>
                <Input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
              </div>
              <div>
                <Label>Date fin (optionnel)</Label>
                <Input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Motif</Label>
              <Textarea value={motif} onChange={(e) => setMotif(e.target.value)} placeholder="Décrivez le motif..." rows={3} />
            </div>
            <Button onClick={createDemande} disabled={loading} className="gradient-primary text-primary-foreground">
              {loading ? "Envoi..." : "Envoyer la demande"}
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">
            {isSecretariat ? "Copies des permissions approuvées" : "Liste des demandes"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {demandes.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Aucune demande</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Demandeur</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date début</TableHead>
                  <TableHead>Motif</TableHead>
                  <TableHead>Statut</TableHead>
                  {canApprove && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {demandes.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">
                      {d.demandeur?.prenom} {d.demandeur?.nom}
                    </TableCell>
                    <TableCell className="capitalize">{d.type_demande}</TableCell>
                    <TableCell>{new Date(d.date_debut).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell className="max-w-xs truncate">{d.motif}</TableCell>
                    <TableCell>{statusBadge(d.status || "en_attente")}</TableCell>
                    {canApprove && d.status === "en_attente" && (
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleDecision(d.id, "approuve")} className="gradient-primary text-primary-foreground">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDecision(d.id, "refuse")}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                    {canApprove && d.status !== "en_attente" && <TableCell />}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
