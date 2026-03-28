import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Eye, EyeOff } from "lucide-react";

const ROLES = [
  { value: "direction", label: "Directeur / Proviseur" },
  { value: "censeur", label: "Censeur" },
  { value: "educateur", label: "Éducateur" },
  { value: "secretariat", label: "Secrétariat" },
  { value: "econome", label: "Économe / DRH" },
  { value: "enseignant", label: "Enseignant" },
  { value: "eleve", label: "Élève" },
  { value: "parent", label: "Parent" },
];

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "", password: "", nom: "", prenom: "", role: "", ecole_nom: "",
  });

  const handleChange = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email, password: form.password,
        });
        if (error) throw error;
        toast.success("Connexion réussie !");
        navigate("/dashboard");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: form.email, password: form.password,
          options: { data: { nom: form.nom, prenom: form.prenom, role: form.role, ecole_nom: form.ecole_nom } },
        });
        if (error) throw error;

        // Create school if direction
        if (form.role === "direction" && data.user) {
          const { data: ecole } = await supabase.from("ecoles_monecole2").insert({
            nom: form.ecole_nom || "Mon École",
          }).select().single();

          if (ecole) {
            await supabase.from("utilisateurs_ecole_monecole2").insert({
              user_id: data.user.id, nom: form.nom, prenom: form.prenom,
              type_utilisateur: "direction" as any, ecole_id: ecole.id, email: form.email,
            });
          }
        } else if (data.user) {
          // For other roles, try to find school or create user record
          await supabase.from("utilisateurs_ecole_monecole2").insert({
            user_id: data.user.id, nom: form.nom, prenom: form.prenom,
            type_utilisateur: form.role as any, email: form.email,
          });
        }
        toast.success("Inscription réussie ! Vérifiez votre email.");
      }
    } catch (err: any) {
      toast.error(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">Mon École</h1>
          <p className="text-muted-foreground mt-2">{isLogin ? "Connectez-vous à votre espace" : "Créez votre compte"}</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nom">Nom</Label>
                    <Input id="nom" value={form.nom} onChange={(e) => handleChange("nom", e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input id="prenom" value={form.prenom} onChange={(e) => handleChange("prenom", e.target.value)} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="role">Rôle</Label>
                  <Select value={form.role} onValueChange={(v) => handleChange("role", v)}>
                    <SelectTrigger><SelectValue placeholder="Sélectionnez un rôle" /></SelectTrigger>
                    <SelectContent>
                      {ROLES.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                {form.role === "direction" && (
                  <div>
                    <Label htmlFor="ecole_nom">Nom de l'école</Label>
                    <Input id="ecole_nom" value={form.ecole_nom} onChange={(e) => handleChange("ecole_nom", e.target.value)} required />
                  </div>
                )}
              </>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold" disabled={loading}>
              {loading ? "Chargement..." : isLogin ? "Se connecter" : "S'inscrire"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-sm text-primary hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Pas encore de compte ? Inscrivez-vous" : "Déjà un compte ? Connectez-vous"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
