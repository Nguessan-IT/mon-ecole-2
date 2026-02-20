import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, Upload, FileText, Clock, CheckCircle, Edit } from "lucide-react";

interface Props {
  role: string;
  ecoleId: string | null;
  userId: string;
}

interface EmploiTemps {
  id: string;
  titre: string;
  semaine_debut: string;
  semaine_fin: string;
  status: string | null;
  created_at: string | null;
}

interface UploadedDoc {
  id: string;
  nom_fichier: string;
  type_document: string;
  statut: string | null;
  created_at: string | null;
}

export default function TimetableManagement({ role, ecoleId, userId }: Props) {
  const [emplois, setEmplois] = useState<EmploiTemps[]>([]);
  const [docs, setDocs] = useState<UploadedDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [titre, setTitre] = useState("");
  const [semaineDebut, setSemaineDebut] = useState("");
  const [semaineFin, setSemaineFin] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canEdit = ["direction", "censeur", "educateur", "secretariat"].includes(role);
  const isStudent = ["eleve", "parent"].includes(role);

  useEffect(() => {
    fetchEmplois();
    fetchDocs();
  }, [ecoleId]);

  const fetchEmplois = async () => {
    try {
      let query = supabase.from("emplois_temps_monecole2").select("*").order("created_at", { ascending: false });
      if (ecoleId) query = query.eq("ecole_id", ecoleId);
      const { data, error } = await query;
      if (error) throw error;
      setEmplois(data || []);
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  const fetchDocs = async () => {
    try {
      let query = supabase.from("documents_importes_monecole2")
        .select("*")
        .eq("type_document", "emploi_temps")
        .order("created_at", { ascending: false });
      if (ecoleId) query = query.eq("ecole_id", ecoleId);
      const { data } = await query;
      setDocs(data || []);
    } catch { /* ignore */ }
  };

  const handleCreate = async () => {
    if (!titre || !semaineDebut || !semaineFin) {
      toast.error("Renseignez tous les champs");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.from("emplois_temps_monecole2").insert({
        titre, semaine_debut: semaineDebut, semaine_fin: semaineFin,
        ecole_id: ecoleId, created_by_id: userId, status: "brouillon",
      });
      if (error) throw error;
      toast.success("Emploi du temps créé !");
      setTitre(""); setSemaineDebut(""); setSemaineFin(""); setShowForm(false);
      fetchEmplois();
    } catch { toast.error("Erreur lors de la création"); } finally { setSaving(false); }
  };

  const handleFileUpload = async (file: File) => {
    const allowed = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf"];
    if (!allowed.includes(file.type)) {
      toast.error("Format non supporté. Utilisez CSV, XLSX, DOCX ou PDF");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Fichier trop volumineux (max 10 Mo)");
      return;
    }
    setUploading(true);
    try {
      const path = `emplois_temps/${ecoleId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from("documents-ecoles").upload(path, file);
      if (uploadError) throw uploadError;
      const { error: dbError } = await supabase.from("documents_importes_monecole2").insert({
        nom_fichier: file.name, chemin_storage: path,
        type_document: "emploi_temps", ecole_id: ecoleId,
        importe_par: userId, statut: "importe",
      });
      if (dbError) throw dbError;
      toast.success(`"${file.name}" importé avec succès !`);
      fetchDocs();
    } catch { toast.error("Erreur lors de l'import"); } finally { setUploading(false); }
  };

  const statusBadge = (s: string | null) => {
    switch (s) {
      case "valide": return <Badge className="bg-green-100 text-green-700 border-0 text-xs"><CheckCircle className="w-3 h-3 mr-1" />Validé</Badge>;
      case "soumis": return <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs"><Clock className="w-3 h-3 mr-1" />Soumis</Badge>;
      default: return <Badge variant="secondary" className="text-xs">Brouillon</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Emplois du temps</h2>
          <Badge variant="secondary">{emplois.length}</Badge>
        </div>
        {canEdit && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-1" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              <Upload className="w-4 h-4" />
              {uploading ? "Import…" : "Importer"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls,.docx,.pdf"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); }}
            />
            <Button size="sm" onClick={() => setShowForm(!showForm)} className="gradient-primary text-white border-0 gap-1">
              <Plus className="w-4 h-4" /> Créer
            </Button>
          </div>
        )}
      </div>

      {canEdit && showForm && (
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Nouvel emploi du temps</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Titre</Label>
              <Input placeholder="Ex: Emploi du temps Terminale A – S1" value={titre} onChange={(e) => setTitre(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Semaine du</Label>
                <Input type="date" value={semaineDebut} onChange={(e) => setSemaineDebut(e.target.value)} />
              </div>
              <div>
                <Label>Au</Label>
                <Input type="date" value={semaineFin} onChange={(e) => setSemaineFin(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleCreate} disabled={saving} className="gradient-primary text-white border-0">Créer</Button>
              <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uploaded docs */}
      {docs.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <FileText className="w-4 h-4" /> Fichiers importés
          </h3>
          <div className="space-y-2">
            {docs.map((d) => (
              <div key={d.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{d.nom_fichier}</span>
                </div>
                <Badge variant="secondary" className="text-xs">{d.statut || "importé"}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : emplois.length === 0 && docs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>{isStudent ? "Aucun emploi du temps disponible" : "Aucun emploi du temps créé"}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {emplois.map((e) => (
            <Card key={e.id} className="border border-border">
              <CardContent className="p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground">{e.titre}</h3>
                    {statusBadge(e.status)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(e.semaine_debut).toLocaleDateString("fr-FR")} → {new Date(e.semaine_fin).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                {canEdit && (
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
