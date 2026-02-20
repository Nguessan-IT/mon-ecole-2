import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import AuthForm from "@/components/AuthForm";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12">
        <div className="text-white max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="font-display text-2xl font-bold">Mon École</span>
          </div>
          <h2 className="font-display text-4xl font-bold mb-4 leading-tight">
            La gestion scolaire réinventée
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Emplois du temps, bulletins, permissions, communiqués — tout en un seul endroit, pour chaque établissement.
          </p>
          <div className="mt-10 space-y-3">
            {["Multi-établissements sécurisé", "Gestion complète des rôles", "Documents PDF automatiques", "Notifications en temps réel"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-white/90">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">Mon École</span>
          </div>
          <AuthForm />
          <p className="text-center text-sm text-muted-foreground mt-6">
            <Link to="/" className="text-primary hover:underline">← Retour à l'accueil</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
