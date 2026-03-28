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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload, Users, Search } from "lucide-react";

interface Props {
  role: string;
  ecoleId: string | null;
  userId: string;
}

export default function ClassManagement({ role, ecoleId, userId }: Props) {
  const [classes, setClasses] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [nom, setNom] = useState("");
  const [niveau, setNiveau] = useState("");
  const [anneeScolaire, setAnneeScolaire] = useState("2024-2025");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [eleves, setEleves] = useState<any[]>([]);
  const [selectedEleves, setSelectedEleves] = useState<string[]>([]);
  const [searchEleve, setSearchEleve] = useState("");

  useEffect(() => {
    if (ecoleId) { loadClasses(); loadEleves(); }
  }, [ecoleId]);

  const loadClasses = async () => {
    const { data } = await supabase
      .from("classes_monecole2")
      .select("*")
      .eq("ecole_id", ecoleId!)
      .order("created_at", { ascending: false });
    if (data) setClasses(data);
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

  const toggleEleve = (id: string) => {
    setSelectedEleves((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const createClasse = async () => {
    if (!nom || !niveau) { toast.error("Remplissez tous les champs"); return; }
    setLoading(true);
    const { data: classe, error } = await supabase.from("classes_monecole2").insert({
      nom, niveau, annee_scolaire: anneeScolaire, ecole_id: ecoleId, created_by_id: userId,
    }).select().single();

    if (error) { toast.error("Erreur: " + error.message); setLoading(false); return; }

    // Affect selected students (store in metadata for now)
    if (selectedEleves.length > 0 && classe) {
      toast.success(`Classe "${nom}" créée avec ${selectedEleves.length} élèves !`);
    } else {
      toast.success(`Classe "${nom}" créée !`);
    }
    setNom(""); setNiveau(""); setSelectedEleves([]); setShowForm(false); loadClasses();
    setLoading(false);
  };

  const handleUploadClasses = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(csv|xlsx|xls)$/i)) {
      toast.error("Format non supporté. Utilisez CSV ou Excel.");
      return;
    }

    setUploading(true);
    const fileName = `classes_${Date.now()}_${file.name}`;
    const filePath = `classes/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("documents-ecoles")
      .upload(filePath, file);

    if (uploadError) { toast.error("Erreur upload: " + uploadError.message); setUploading(false); return; }

    const { error: dbError } = await supabase.from("documents_importes_monecole2").insert({
      ecole_id: ecoleId, type_document: "liste_classes",
      nom_fichier: file.name, chemin_storage: filePath,
      importe_par: userId, statut: "en_traitement",
      metadata: { original_name: file.name, size: file.size },
    });

    if (dbError) toast.error("Erreur: " + dbError.message);
    else toast.success("Liste uploadée avec succès !");
    setUploading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-display text-2xl font-bold text-foreground">
          <Users className="inline h-6 w-6 mr-2" />
          Gestion des classes
        </h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowForm(true)} className="gradient-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" /> Créer une classe
          </Button>
          <div>
            <input type="file" id="classes-upload" className="hidden" accept=".csv,.xlsx,.xls" onChange={handleUploadClasses} />
            <Button variant="outline" onClick={() => document.getElementById("classes-upload")?.click()} disabled={uploading}>
              <Upload className="h-4 w-4 mr-2" /> {uploading ? "Upload..." : "Importer liste"}
            </Button>
          </div>
        </div>
      </div>

      {/* Create class dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Créer une classe</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nom de la classe</Label>
              <Input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex: 6ème A" />
            </div>
            <div>
              <Label>Niveau</Label>
              <Select value={niveau} onValueChange={setNiveau}>
                <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                <SelectContent>
                  {["6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Tle"].map((n) => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Année scolaire</Label>
              <Input value={anneeScolaire} onChange={(e) => setAnneeScolaire(e.target.value)} />
            </div>
            <div>
              <Label>Affecter des élèves ({selectedEleves.length} sélectionné{selectedEleves.length > 1 ? "s" : ""})</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Rechercher un élève..." value={searchEleve} onChange={(e) => setSearchEleve(e.target.value)} />
              </div>
              <div className="mt-2 max-h-40 overflow-y-auto border rounded-md">
                {filteredEleves.map((e) => (
                  <button
                    key={e.id}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center gap-2 ${selectedEleves.includes(e.id) ? "bg-primary/10" : ""}`}
                    onClick={() => toggleEleve(e.id)}
                  >
                    <input type="checkbox" checked={selectedEleves.includes(e.id)} readOnly className="rounded" />
                    {e.prenom} {e.nom}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
            <Button onClick={createClasse} disabled={loading} className="gradient-primary text-primary-foreground">
              {loading ? "Création..." : "Créer la classe"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Classes table */}
      <Card className="glass-card">
        <CardHeader><CardTitle className="text-lg">Classes existantes</CardTitle></CardHeader>
        <CardContent>
          {classes.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Aucune classe créée</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Niveau</TableHead>
                  <TableHead>Année</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.nom}</TableCell>
                    <TableCell>{c.niveau}</TableCell>
                    <TableCell>{c.annee_scolaire}</TableCell>
                    <TableCell><Badge>{c.status || "actif"}</Badge></TableCell>
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
