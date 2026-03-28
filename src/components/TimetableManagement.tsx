import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Upload, Calendar, FileText } from "lucide-react";

interface Props {
  role: string;
  ecoleId: string | null;
  userId: string;
}

export default function TimetableManagement({ role, ecoleId, userId }: Props) {
  const [emplois, setEmplois] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const canEdit = ["educateur", "censeur", "direction", "secretariat"].includes(role);
  const canUpload = canEdit;

  useEffect(() => {
    if (ecoleId) loadEmplois();
  }, [ecoleId]);

  const loadEmplois = async () => {
    const { data } = await supabase
      .from("documents_importes_monecole2")
      .select("*")
      .eq("ecole_id", ecoleId!)
      .eq("type_document", "emploi_temps")
      .order("created_at", { ascending: false });
    if (data) setEmplois(data);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "text/csv", "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(csv|xlsx|xls|docx|pdf)$/i)) {
      toast.error("Format non supporté. Utilisez CSV, XLSX, DOCX ou PDF.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Fichier trop volumineux (max 10 MB)");
      return;
    }

    setUploading(true);
    const fileName = `emploi_temps_${Date.now()}_${file.name}`;
    const filePath = `emplois_temps/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("documents-ecoles")
      .upload(filePath, file);

    if (uploadError) {
      toast.error("Erreur upload: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { error: dbError } = await supabase.from("documents_importes_monecole2").insert({
      ecole_id: ecoleId,
      type_document: "emploi_temps",
      nom_fichier: file.name,
      chemin_storage: filePath,
      importe_par: userId,
      statut: "actif",
      metadata: { original_name: file.name, size: file.size, type: file.type },
    });

    if (dbError) toast.error("Erreur: " + dbError.message);
    else { toast.success("Emploi du temps uploadé !"); loadEmplois(); }
    setUploading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-foreground">
          <Calendar className="inline h-6 w-6 mr-2" />
          Emplois du temps
        </h2>
        {canUpload && (
          <div>
            <input
              type="file"
              id="timetable-upload"
              className="hidden"
              accept=".csv,.xlsx,.xls,.docx,.pdf"
              onChange={handleFileUpload}
            />
            <Button
              onClick={() => document.getElementById("timetable-upload")?.click()}
              disabled={uploading}
              className="gradient-primary text-primary-foreground"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Upload..." : "Uploader un fichier"}
            </Button>
          </div>
        )}
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Fichiers d'emplois du temps</CardTitle>
        </CardHeader>
        <CardContent>
          {emplois.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Aucun emploi du temps disponible</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du fichier</TableHead>
                  <TableHead>Date d'upload</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emplois.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      {e.nom_fichier}
                    </TableCell>
                    <TableCell>{e.created_at ? new Date(e.created_at).toLocaleDateString("fr-FR") : "—"}</TableCell>
                    <TableCell><Badge>{e.statut || "actif"}</Badge></TableCell>
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
