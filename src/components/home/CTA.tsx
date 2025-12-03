import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
            Comece sua jornada para a CNH hoje
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Junte-se a milhares de brasileiros que já estão economizando e 
            aprendendo a dirigir com mais flexibilidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="hero" asChild>
              <Link to="/cadastro">
                Criar Conta Grátis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              size="xl" 
              variant="outline" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              asChild
            >
              <Link to="/instrutores">Ver Instrutores</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
