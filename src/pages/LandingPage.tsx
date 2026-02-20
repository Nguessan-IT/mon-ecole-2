import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, Users, Calendar, FileText,
  Shield, BarChart3, Bell, CheckCircle, ArrowRight, School
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Users, title: "Gestion multi-rôles", desc: "Direction, censeurs, éducateurs, enseignants, élèves et parents — chacun son espace." },
  { icon: Calendar, title: "Emplois du temps", desc: "Conception, validation et diffusion des emplois du temps en quelques clics." },
  { icon: FileText, title: "Bulletins & reçus", desc: "Génération PDF automatique des bulletins scolaires et reçus financiers." },
  { icon: Bell, title: "Communiqués", desc: "Diffusion instantanée d'annonces et de documents officiels à toute l'école." },
  { icon: Shield, title: "Sécurité multi-tenant", desc: "Données isolées par établissement, accès sécurisé par rôle." },
  { icon: BarChart3, title: "Analytics", desc: "Suivi d'activité et tableaux de bord pour piloter votre établissement." },
];

const roles = ["Direction / Proviseur", "Censeurs", "Éducateurs", "Secrétariat", "RH & Économat", "Enseignants", "Élèves & Parents"];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">Mon École</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Se connecter</Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="gradient-primary text-white border-0">Commencer</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <School className="w-4 h-4" />
              Plateforme SaaS multi-établissements
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6">
              Gérez votre école{" "}
              <span className="text-primary">simplement</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Mon École digitalise la gestion scolaire — emplois du temps, bulletins, permissions, communiqués — pour chaque établissement, en toute sécurité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="gradient-primary text-white border-0 gap-2">
                  Démarrer gratuitement <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline">Voir la démo</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roles banner */}
      <section className="py-8 border-y border-border bg-muted/30">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {roles.map((r) => (
              <span key={r} className="inline-flex items-center gap-1.5 bg-background border border-border rounded-full px-4 py-1.5 text-sm text-foreground">
                <CheckCircle className="w-3.5 h-3.5 text-primary" /> {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">Tout ce dont votre école a besoin</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Une plateforme unifiée pour toutes les parties prenantes de votre établissement.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-hover bg-card border border-border rounded-xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="gradient-primary rounded-2xl p-12 text-center text-white">
            <h2 className="font-display text-4xl font-bold mb-4">Prêt à transformer votre école ?</h2>
            <p className="text-white/80 mb-8 text-lg">Rejoignez les établissements qui font confiance à Mon École.</p>
            <Link to="/auth">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Créer mon portail <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-foreground">Mon École</span>
          </div>
          <p className="text-muted-foreground text-sm">© 2026 Mon École. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
