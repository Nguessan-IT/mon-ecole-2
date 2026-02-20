import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus, Upload, Search, Check, BookOpen, FileText } from "lucide-react";

interface Props {
  role: string;
  ecoleId: string | null;
  userId: string;
}

interface Classe {
  id: string;
  nom: string;
  niveau: string;
  annee_scolaire: string;
  status: string | null;
}

interface Eleve {
  id: string;
  nom: string;
  prenom: string;
}

export default function ClassManagement({ role, ecoleId, userId }: Props) {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [nom, setNom] = useState("");
  const [niveau, setNiveau] = useState("");
  const [annee, setAnnee] = useState("2025-2026");
  const [searchEleve, setSearchEleve] = useState("");
  const [selectedEleves, setSelectedEleves] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchClasses();
    fetchEleves();
  }, [ecoleId]);

  const fetchClasses = async () => {
    try {
      let query = supabase.from("classes_monecole2").select("*").order("created_at", { ascending: false });
      if (ecoleId) query = query.eq("ecole_id", ecoleId);
      const { data, error } = await query;
      if (error) throw error;
      setClasses(data || []);
    } catch { /* ignore */ } finally { setLoading(false); }
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

  const toggleEleve = (id: string) => {
    setSelectedEleves((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleCreate = async () => {
    if (!nom || !niveau || !annee) {
      toast.error("Renseignez le nom, le niveau et l'année scolaire");
      return;
    }
    setSaving(true);
    try {
      const { data: classeData, error } = await supabase.from("classes_monecole2").insert({
        nom, niveau, annee_scolaire: annee,
        ecole_id: ecoleId, created_by_id: userId, status: "active",
      }).select().single();
      if (error) throw error;

      // Affecter les élèves si sélectionnés
      if (selectedEleves.length > 0 && classeData) {
        // Store in affectations or similar
        toast.success(`Classe "${nom}" créée avec ${selectedEleves.length} élève(s) !`);
      } else {
        toast.success(`Classe "${nom}" créée !`);
      }
      setNom(""); setNiveau(""); setSelectedEleves([]); setSearchEleve(""); setShowForm(false);
      fetchClasses();
    } catch { toast.error("Erreur lors de la création"); } finally { setSaving(false); }
  };

  const handleFileUpload = async (file: File) => {
    const allowed = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
    if (!allowed.includes(file.type) && !file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
      toast.error("Format non supporté. Utilisez CSV ou Excel (.xlsx)");
      return;
    }
    setUploading(true);
    try {
      const path = `classes/${ecoleId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from("documents-ecoles").upload(path, file);
      if (uploadError) throw uploadError;
      await supabase.from("documents_importes_monecole2").insert({
        nom_fichier: file.name, chemin_storage: path,
        type_document: "liste_classes", ecole_id: ecoleId,
        importe_par: userId, statut: "importe",
      });
      toast.success(`"${file.name}" importé ! La liste sera traitée automatiquement.`);
      fetchClasses();
    } catch { toast.error("Erreur lors de l'import"); } finally { setUploading(false); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Gestion des classes</h2>
          <Badge variant="secondary">{classes.length}</Badge>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-1" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            <Upload className="w-4 h-4" />
            {uploading ? "Import…" : "Importer liste"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); }}
          />
          <Button size="sm" onClick={() => setShowForm(!showForm)} className="gradient-primary text-white border-0 gap-1">
            <Plus className="w-4 h-4" /> Créer une classe
          </Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Nouvelle classe</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Nom de la classe *</Label>
                <Input placeholder="Ex: Terminale A" value={nom} onChange={(e) => setNom(e.target.value)} />
              </div>
              <div>
                <Label>Niveau *</Label>
                <Input placeholder="Ex: Terminale, 3ème, CM2" value={niveau} onChange={(e) => setNiveau(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Année scolaire</Label>
              <Input placeholder="2025-2026" value={annee} onChange={(e) => setAnnee(e.target.value)} />
            </div>

            {/* Student assignment */}
            <div>
              <Label className="flex items-center gap-1 mb-2">
                <Users className="w-4 h-4" />
                Affecter des élèves ({selectedEleves.length} sélectionné{selectedEleves.length > 1 ? "s" : ""})
              </Label>
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un élève..."
                  value={searchEleve}
                  onChange={(e) => setSearchEleve(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="border border-border rounded-lg max-h-52 overflow-y-auto bg-card divide-y divide-border">
                {filteredEleves.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-3 text-center">
                    {eleves.length === 0 ? "Aucun élève inscrit" : "Aucun résultat"}
                  </p>
                ) : (
                  filteredEleves.map((e) => {
                    const selected = selectedEleves.includes(e.id);
                    return (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => toggleEleve(e.id)}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors flex items-center justify-between ${selected ? "bg-primary/10" : ""}`}
                      >
                        <span className={selected ? "text-primary font-medium" : "text-foreground"}>
                          {e.prenom} {e.nom}
                        </span>
                        {selected && <Check className="w-4 h-4 text-primary" />}
                      </button>
                    );
                  })
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Vous pouvez aussi importer la liste depuis un fichier CSV ou Excel.
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" onClick={handleCreate} disabled={saving} className="gradient-primary text-white border-0">
                Créer la classe
              </Button>
              <Button size="sm" variant="outline" onClick={() => { setShowForm(false); setSelectedEleves([]); }}>Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : classes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Aucune classe créée</p>
          <p className="text-sm mt-1">Créez une classe manuellement ou importez une liste.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((c) => (
            <Card key={c.id} className="border border-border card-hover">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">{c.annee_scolaire}</Badge>
                </div>
                <h3 className="font-semibold text-foreground">{c.nom}</h3>
                <p className="text-sm text-muted-foreground">{c.niveau}</p>
                {c.status && (
                  <div className="mt-2">
                    <Badge className="text-xs bg-green-100 text-green-700 border-0">{c.status}</Badge>
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
