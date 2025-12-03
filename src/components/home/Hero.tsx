import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Wallet } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <Badge variant="secondary" className="text-sm">
              Nova Resolução Contran em vigor ✓
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
              Sua CNH com até{" "}
              <span className="text-gradient">80% menos custo</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Conectamos você a instrutores autônomos credenciados pelo Detran. 
              Agende aulas práticas com flexibilidade total, pagando menos e aprendendo no seu ritmo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="xl" asChild>
                <Link to="/instrutores">
                  Encontrar Instrutor
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link to="/instrutor/dashboard">Sou Instrutor</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Economia Real</p>
                  <p className="text-sm text-muted-foreground">Até 80% menos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Flexibilidade</p>
                  <p className="text-sm text-muted-foreground">Você escolhe</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Segurança</p>
                  <p className="text-sm text-muted-foreground">Registro Renach</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-20 blur-2xl" />
              <div className="relative bg-card rounded-3xl p-8 shadow-xl border border-border">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-foreground">AR</span>
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Auto-Rota</p>
                      <p className="text-sm text-muted-foreground">Solução Homologada</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <span className="text-sm text-muted-foreground">Instrutores ativos</span>
                      <span className="font-bold text-foreground">2.847</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <span className="text-sm text-muted-foreground">Aulas realizadas</span>
                      <span className="font-bold text-foreground">45.231</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <span className="text-sm text-muted-foreground">Satisfação</span>
                      <span className="font-bold text-accent">98.5%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-4 bg-accent/10 rounded-xl border border-accent/20">
                    <Shield className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium text-foreground">Integrado ao Renach</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
