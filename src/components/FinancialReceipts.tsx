import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Receipt, Plus, Edit, Download, Search, Check, X } from "lucide-react";

interface Props {
  role: string;
  ecoleId: string | null;
  userId: string;
}

interface Recu {
  id: string;
  eleve_id: string;
  montant: number;
  type_paiement: string;
  description: string | null;
  statut: string | null;
  created_at: string | null;
}

interface Eleve {
  id: string;
  nom: string;
  prenom: string;
}

export default function FinancialReceipts({ role, ecoleId, userId }: Props) {
  const [recus, setRecus] = useState<Recu[]>([]);
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchEleve, setSearchEleve] = useState("");
  const [selectedEleve, setSelectedEleve] = useState("");
  const [montant, setMontant] = useState("");
  const [typePaiement, setTypePaiement] = useState("inscription");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const canEdit = ["econome", "rh", "direction"].includes(role);
  const isStudent = ["eleve", "parent"].includes(role);

  useEffect(() => {
    fetchRecus();
    if (canEdit) fetchEleves();
  }, [ecoleId, userId]);

  const fetchRecus = async () => {
    try {
      let query = supabase.from("recus_monecole2").select("*").order("created_at", { ascending: false });
      if (isStudent) {
        query = query.eq("eleve_id", userId);
      } else if (ecoleId) {
        query = query.eq("ecole_id", ecoleId);
      }
      const { data, error } = await query;
      if (error) throw error;
      setRecus(data || []);
    } catch {
      console.error("Erreur chargement reçus");
    } finally {
      setLoading(false);
    }
  };

  const fetchEleves = async () => {
    try {
      let query = supabase.from("utilisateurs_ecole_monecole2").select("id, nom, prenom").eq("role", "eleve");
      if (ecoleId) query = query.eq("ecole_id", ecoleId);
      const { data } = await query;
      setEleves(data || []);
    } catch { /* ignore */ }
  };

  const filteredEleves = eleves.filter((e) =>
    `${e.prenom} ${e.nom}`.toLowerCase().includes(searchEleve.toLowerCase())
  );

  const resetForm = () => {
    setSelectedEleve(""); setMontant(""); setTypePaiement("inscription");
    setDescription(""); setEditingId(null); setSearchEleve(""); setShowForm(false);
  };

  const startEdit = (r: Recu) => {
    setEditingId(r.id);
    setSelectedEleve(r.eleve_id);
    setMontant(String(r.montant));
    setTypePaiement(r.type_paiement);
    setDescription(r.description || "");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async () => {
    if (!selectedEleve || !montant) {
      toast.error("Sélectionnez un élève et renseignez le montant");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase.from("recus_monecole2").update({
          eleve_id: selectedEleve, montant: parseFloat(montant),
          type_paiement: typePaiement, description,
        }).eq("id", editingId);
        if (error) throw error;
        toast.success("Reçu modifié !");
      } else {
        const { error } = await supabase.from("recus_monecole2").insert({
          eleve_id: selectedEleve, montant: parseFloat(montant),
          type_paiement: typePaiement, description,
          ecole_id: ecoleId, emetteur_id: userId, statut: "emis",
        });
        if (error) throw error;
        toast.success("Reçu créé et disponible pour l'élève !");
      }
      resetForm(); fetchRecus();
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const getEleveName = (id: string) => {
    const e = eleves.find((el) => el.id === id);
    return e ? `${e.prenom} ${e.nom}` : id;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Reçus financiers</h2>
          <Badge variant="secondary">{recus.length}</Badge>
        </div>
        {canEdit && (
          <Button size="sm" onClick={() => { resetForm(); setShowForm(!showForm); }} className="gradient-primary text-white border-0 gap-1">
            <Plus className="w-4 h-4" /> Nouveau reçu
          </Button>
        )}
      </div>

      {canEdit && showForm && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{editingId ? "Modifier le reçu" : "Créer un reçu"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Student search */}
            <div>
              <Label>Élève *</Label>
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un élève..."
                  value={searchEleve}
                  onChange={(e) => setSearchEleve(e.target.value)}
                  className="pl-9"
                />
              </div>
              {searchEleve && (
                <div className="border border-border rounded-lg max-h-48 overflow-y-auto bg-card divide-y divide-border">
                  {filteredEleves.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-3">Aucun élève trouvé</p>
                  ) : (
                    filteredEleves.map((e) => (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => { setSelectedEleve(e.id); setSearchEleve(`${e.prenom} ${e.nom}`); }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors flex items-center justify-between ${selectedEleve === e.id ? "bg-primary/10 text-primary font-medium" : "text-foreground"}`}
                      >
                        {e.prenom} {e.nom}
                        {selectedEleve === e.id && <Check className="w-4 h-4" />}
                      </button>
                    ))
                  )}
                </div>
              )}
              {selectedEleve && !searchEleve.includes(" ") && (
                <p className="text-xs text-primary mt-1">Sélectionné : {getEleveName(selectedEleve)}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Type de paiement</Label>
                <Select value={typePaiement} onValueChange={setTypePaiement}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inscription">Inscription</SelectItem>
                    <SelectItem value="scolarite">Scolarité</SelectItem>
                    <SelectItem value="cantine">Cantine</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="evenement">Événement</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Montant (FCFA) *</Label>
                <Input type="number" placeholder="Ex: 50000" value={montant} onChange={(e) => setMontant(e.target.value)} />
              </div>
            </div>

            <div>
              <Label>Description (optionnel)</Label>
              <Input placeholder="Note ou détail..." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} disabled={saving} className="gradient-primary text-white border-0">
                {editingId ? "Enregistrer" : "Créer le reçu"}
              </Button>
              <Button size="sm" variant="outline" onClick={resetForm}>Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : recus.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Receipt className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>{isStudent ? "Aucun reçu disponible" : "Aucun reçu créé"}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recus.map((r) => (
            <Card key={r.id} className="border border-border">
              <CardContent className="p-4 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {canEdit && (
                    <p className="text-sm font-medium text-foreground">{getEleveName(r.eleve_id)}</p>
                  )}
                  <div className="flex items-center gap-2 flex-wrap mt-0.5">
                    <Badge variant="secondary" className="text-xs capitalize">{r.type_paiement}</Badge>
                    {r.statut && (
                      <Badge className={`text-xs ${r.statut === "emis" ? "bg-green-100 text-green-700 border-0" : "bg-muted text-muted-foreground border-0"}`}>
                        {r.statut}
                      </Badge>
                    )}
                    {r.description && <span className="text-xs text-muted-foreground truncate">{r.description}</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {r.created_at ? new Date(r.created_at).toLocaleDateString("fr-FR") : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-bold text-foreground">{r.montant.toLocaleString()} FCFA</span>
                  {canEdit && (
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => startEdit(r)} title="Modifier">
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                  <Button size="icon" variant="ghost" className="h-8 w-8" title="Télécharger">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
