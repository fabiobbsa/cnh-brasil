import { Card, CardContent } from "@/components/ui/card";
import { 
  CreditCard, 
  MapPin, 
  FileText, 
  Shield, 
  Clock, 
  Star 
} from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Pagamento Seguro",
    description: "Pague diretamente pelo app com total segurança e transparência.",
  },
  {
    icon: MapPin,
    title: "Instrutor Perto de Você",
    description: "Encontre profissionais credenciados na sua região.",
  },
  {
    icon: FileText,
    title: "LAV Digital",
    description: "Sua Licença de Aprendizagem Veicular sempre disponível no app.",
  },
  {
    icon: Shield,
    title: "100% Legal",
    description: "Solução homologada pela Senatran com registro no Renach.",
  },
  {
    icon: Clock,
    title: "Agenda Flexível",
    description: "Você e o instrutor definem os horários que funcionam melhor.",
  },
  {
    icon: Star,
    title: "Avaliações Reais",
    description: "Veja feedback de outros alunos antes de escolher.",
  },
];

export function Features() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tudo que você precisa
          </h2>
          <p className="text-muted-foreground text-lg">
            Uma plataforma completa para sua jornada até a CNH
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
