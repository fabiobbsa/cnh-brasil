import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/home/Footer";
import { InstructorCard, Instructor } from "@/components/instructors/InstructorCard";
import { SearchFilters } from "@/components/instructors/SearchFilters";

const mockInstructors: Instructor[] = [
  {
    id: "1",
    name: "Carlos Eduardo Silva",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 127,
    location: "São Paulo, SP - Zona Sul",
    categories: ["Categoria B"],
    pricePerHour: 75,
    experience: "8 anos",
    nextAvailable: "Hoje, 14h",
    verified: true,
  },
  {
    id: "2",
    name: "Ana Paula Santos",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 89,
    location: "São Paulo, SP - Centro",
    categories: ["Categoria A", "Categoria B"],
    pricePerHour: 80,
    experience: "5 anos",
    nextAvailable: "Amanhã, 9h",
    verified: true,
  },
  {
    id: "3",
    name: "Roberto Oliveira",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 203,
    location: "São Paulo, SP - Zona Norte",
    categories: ["Categoria A"],
    pricePerHour: 65,
    experience: "12 anos",
    nextAvailable: "Hoje, 16h",
    verified: true,
  },
  {
    id: "4",
    name: "Mariana Costa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    rating: 5.0,
    reviewCount: 45,
    location: "São Paulo, SP - Zona Oeste",
    categories: ["Categoria B"],
    pricePerHour: 90,
    experience: "3 anos",
    nextAvailable: "Seg, 10h",
    verified: true,
  },
  {
    id: "5",
    name: "Fernando Almeida",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    rating: 4.6,
    reviewCount: 156,
    location: "São Paulo, SP - Zona Leste",
    categories: ["Categoria A", "Categoria B"],
    pricePerHour: 70,
    experience: "10 anos",
    nextAvailable: "Qua, 8h",
    verified: true,
  },
  {
    id: "6",
    name: "Juliana Ferreira",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 78,
    location: "São Paulo, SP - ABC",
    categories: ["Categoria B"],
    pricePerHour: 85,
    experience: "6 anos",
    nextAvailable: "Hoje, 18h",
    verified: true,
  },
];

const Instructors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Instrutores Disponíveis
            </h1>
            <p className="text-muted-foreground">
              Encontre instrutores autônomos credenciados pelo Detran na sua região
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <SearchFilters onSearch={() => {}} />
            </div>
            
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{mockInstructors.length}</span> instrutores encontrados
                </p>
                <select className="text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground">
                  <option>Ordenar por: Relevância</option>
                  <option>Menor preço</option>
                  <option>Maior avaliação</option>
                  <option>Mais próximo</option>
                </select>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {mockInstructors.map((instructor, index) => (
                  <div 
                    key={instructor.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <InstructorCard instructor={instructor} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Instructors;
