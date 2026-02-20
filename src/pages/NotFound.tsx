import { Link } from "react-router-dom";
import { GraduationCap, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-9 h-9 text-white" />
        </div>
        <h1 className="font-display text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Page introuvable</h2>
        <p className="text-muted-foreground mb-8">La page que vous recherchez n'existe pas ou a été déplacée.</p>
        <Link to="/">
          <Button className="gradient-primary text-white border-0 gap-2">
            <Home className="w-4 h-4" /> Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}
