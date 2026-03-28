import { Link } from "react-router-dom";
import { GraduationCap, Shield, Users, Calendar, FileText, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const features = [
    { icon: Shield, title: "Sécurité & Rôles", desc: "Accès contrôlé par rôle : direction, enseignant, élève, parent…" },
    { icon: Users, title: "Multi-Tenant", desc: "Chaque école dispose de son portail indépendant et personnalisé." },
    { icon: Calendar, title: "Emplois du temps", desc: "Conception, validation et diffusion automatisée des plannings." },
    { icon: FileText, title: "Bulletins & Reçus", desc: "Génération et diffusion de bulletins scolaires et reçus financiers." },
    { icon: Bell, title: "Communiqués", desc: "Diffusion instantanée d'annonces à toute la communauté scolaire." },
    { icon: GraduationCap, title: "Suivi Pédagogique", desc: "Notes, devoirs et suivi complet de la scolarité des élèves." },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <nav className="container mx-auto flex items-center justify-between py-6 px-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">Mon École</span>
          </div>
          <Link to="/auth">
            <Button size="lg" className="gradient-primary text-primary-foreground font-semibold shadow-lg hover:opacity-90 transition-opacity">
              Commencer
            </Button>
          </Link>
        </nav>

        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in">
            La gestion scolaire
            <span className="block text-primary">réinventée.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in">
            Plateforme SaaS complète pour digitaliser la gestion de votre établissement scolaire. Multi-tenant, sécurisée et mobile-first.
          </p>
          <Link to="/auth">
            <Button size="lg" className="gradient-primary text-primary-foreground text-lg px-10 py-6 font-semibold shadow-xl hover:opacity-90 transition-opacity animate-fade-in">
              Créer votre école
            </Button>
          </Link>
        </div>
      </header>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="font-display text-3xl font-bold text-center text-foreground mb-16">
          Tout ce dont votre école a besoin
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="glass-card rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-5">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Mon École. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
