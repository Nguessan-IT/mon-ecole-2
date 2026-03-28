import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground mb-8">Page introuvable</p>
        <Link to="/"><Button>Retour à l'accueil</Button></Link>
      </div>
    </div>
  );
}
