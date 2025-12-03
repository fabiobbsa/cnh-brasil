import { Search, Calendar, Car, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Encontre seu instrutor",
    description: "Busque instrutores credenciados pelo Detran próximos a você. Veja avaliações e disponibilidade.",
  },
  {
    icon: Calendar,
    title: "Agende sua aula",
    description: "Escolha data, horário e local que funcionam para você. Total flexibilidade de agenda.",
  },
  {
    icon: Car,
    title: "Pratique com segurança",
    description: "Tenha aulas práticas com instrutor qualificado. Tudo registrado oficialmente.",
  },
  {
    icon: CheckCircle,
    title: "Validação no Renach",
    description: "Suas aulas são registradas automaticamente no sistema do Detran.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como Funciona
          </h2>
          <p className="text-muted-foreground text-lg">
            Processo simples, seguro e totalmente legalizado pelo Contran
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border" />
              )}
              
              <div className="relative bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="absolute top-4 right-4 text-4xl font-bold text-muted/50">
                  {index + 1}
                </span>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
