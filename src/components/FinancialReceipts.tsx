import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Download, Search, Receipt } from "lucide-react";

interface Props {
  role: string;
  ecoleId: string | null;
  userId: string;
}

interface Recu {
  id: string;
  type_document: string;
  nom_fichier: string;
  chemin_storage: string;
  statut: string | null;
  created_at: string | null;
  metadata: any;
}

export default function FinancialReceipts({ role, ecoleId, userId }: Props) {
  const [recus, setRecus] = useState<Recu[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eleves, setEleves] = useState<any[]>([]);
  const [searchEleve, setSearchEleve] = useState("");
  const [selectedEleveId, setSelectedEleveId] = useState("");
  const [montant, setMontant] = useState("");
  const [description, setDescription] = useState("");
  const [typeRecu, setTypeRecu] = useState("inscription");

  const canEdit = ["econome", "direction"].includes(role);
  const isViewOnly = ["eleve", "parent", "secretariat"].includes(role);

  useEffect(() => {
    if (ecoleId) {
      loadRecus();
      if (canEdit) loadEleves();
    }
  }, [ecoleId]);

  const loadRecus = async () => {
    let query = supabase
      .from("documents_importes_monecole2")
      .select("*")
      .eq("ecole_id", ecoleId!)
      .eq("type_document", "recu_financier")
      .order("created_at", { ascending: false });

    if (role === "eleve") {
      query = query.contains("metadata", { eleve_id: userId });
    }

    const { data } = await query;
    if (data) setRecus(data as Recu[]);
  };

  const loadEleves = async () => {
    const { data } = await supabase
      .from("utilisateurs_ecole_monecole2")
      .select("id, nom, prenom, email")
      .eq("ecole_id", ecoleId!)
      .eq("type_utilisateur", "eleve")
      .order("nom");
    if (data) setEleves(data);
  };

  const filteredEleves = eleves.filter((e) =>
    `${e.nom} ${e.prenom} ${e.email}`.toLowerCase().includes(searchEleve.toLowerCase())
  );

  const createRecu = async () => {
    if (!selectedEleveId || !montant || !description) {
      toast.error("Remplissez tous les champs"); return;
    }
    setLoading(true);
    const selectedEleve = eleves.find((e) => e.id === selectedEleveId);
    const nomFichier = `recu_${typeRecu}_${selectedEleve?.nom}_${Date.now()}.pdf`;

    const { error } = await supabase.from("documents_importes_monecole2").insert({
      ecole_id: ecoleId,
      type_document: "recu_financier",
      nom_fichier: nomFichier,
      chemin_storage: `recus/${nomFichier}`,
      importe_par: userId,
      statut: "valide",
      metadata: {
        eleve_id: selectedEleveId,
        eleve_nom: `${selectedEleve?.prenom} ${selectedEleve?.nom}`,
        montant: parseFloat(montant),
        description,
        type_recu: typeRecu,
      },
    });

    if (error) toast.error("Erreur: " + error.message);
    else {
      toast.success("Reçu créé avec succès !");
      setShowForm(false);
      setSelectedEleveId("");
      setMontant("");
      setDescription("");
      loadRecus();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-foreground">
          <Receipt className="inline h-6 w-6 mr-2" />
          {isViewOnly ? "Mes reçus financiers" : "Gestion des reçus financiers"}
        </h2>
        {canEdit && (
          <Button onClick={() => setShowForm(true)} className="gradient-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" /> Nouveau reçu
          </Button>
        )}
      </div>

      {/* Create receipt dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Créer un reçu financier</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Rechercher un élève</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Nom, prénom ou email..."
                  value={searchEleve}
                  onChange={(e) => setSearchEleve(e.target.value)}
                />
              </div>
              {searchEleve && (
                <div className="mt-2 max-h-40 overflow-y-auto border rounded-md">
                  {filteredEleves.map((e) => (
                    <button
                      key={e.id}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-accent ${selectedEleveId === e.id ? "bg-primary/10 font-semibold" : ""}`}
                      onClick={() => { setSelectedEleveId(e.id); setSearchEleve(`${e.prenom} ${e.nom}`); }}
                    >
                      {e.prenom} {e.nom} — {e.email}
                    </button>
                  ))}
                  {filteredEleves.length === 0 && <p className="p-3 text-sm text-muted-foreground">Aucun élève trouvé</p>}
                </div>
              )}
            </div>
            <div>
              <Label>Type de reçu</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={typeRecu}
                onChange={(e) => setTypeRecu(e.target.value)}
              >
                <option value="inscription">Inscription</option>
                <option value="scolarite">Scolarité</option>
                <option value="evenement">Événement</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div>
              <Label>Montant (FCFA)</Label>
              <Input type="number" value={montant} onChange={(e) => setMontant(e.target.value)} placeholder="Ex: 50000" />
            </div>
            <div>
              <Label>Description</Label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description du reçu..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
            <Button onClick={createRecu} disabled={loading} className="gradient-primary text-primary-foreground">
              {loading ? "Création..." : "Créer le reçu"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Receipts table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Liste des reçus</CardTitle>
        </CardHeader>
        <CardContent>
          {recus.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Aucun reçu disponible</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Élève</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recus.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.metadata?.eleve_nom || "—"}</TableCell>
                    <TableCell className="capitalize">{r.metadata?.type_recu || "—"}</TableCell>
                    <TableCell>{r.metadata?.montant ? `${r.metadata.montant.toLocaleString()} FCFA` : "—"}</TableCell>
                    <TableCell>{r.metadata?.description || "—"}</TableCell>
                    <TableCell>{r.created_at ? new Date(r.created_at).toLocaleDateString("fr-FR") : "—"}</TableCell>
                    <TableCell><Badge variant={r.statut === "valide" ? "default" : "secondary"}>{r.statut || "en attente"}</Badge></TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
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
