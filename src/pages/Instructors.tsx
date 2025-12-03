import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/home/Footer";
import { InstructorCard, Instructor } from "@/components/instructors/InstructorCard";
import { SearchFilters } from "@/components/instructors/SearchFilters";
import { useInstructors } from "@/hooks/useInstructors";
import { Loader2 } from "lucide-react";

const Instructors = () => {
  const [filters, setFilters] = useState({
    category: '',
    city: '',
  });

  const { data: instructors, isLoading, error } = useInstructors(filters);

  const handleSearch = (newFilters: any) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const mapInstructorData = (instructor: any): Instructor => ({
    id: instructor.id,
    name: instructor.user.fullName,
    avatar: instructor.user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.user.fullName)}`,
    rating: Number(instructor.averageRating) || 0,
    reviewCount: instructor.totalReviews || 0,
    location: instructor.user.addressCity && instructor.user.addressState 
      ? `${instructor.user.addressCity}, ${instructor.user.addressState}`
      : "Localização não informada",
    categories: instructor.categories?.map((c: any) => c.category.name) || [],
    pricePerHour: Number(instructor.pricePerHour) || 0,
    experience: `${instructor.experienceYears || 0} anos`,
    nextAvailable: "Consultar disponibilidade",
    verified: instructor.isVerified || false,
  });

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
              <SearchFilters onSearch={handleSearch} />
            </div>
            
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-destructive mb-4">Erro ao carregar instrutores</p>
                  <p className="text-sm text-muted-foreground">
                    {error instanceof Error ? error.message : "Tente novamente mais tarde"}
                  </p>
                </div>
              ) : !instructors || instructors.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">Nenhum instrutor encontrado com os filtros selecionados</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">{instructors.length}</span> instrutores encontrados
                    </p>
                    <select className="text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground">
                      <option>Ordenar por: Relevância</option>
                      <option>Menor preço</option>
                      <option>Maior avaliação</option>
                      <option>Mais próximo</option>
                    </select>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {instructors.map((instructor: any, index: number) => (
                      <div 
                        key={instructor.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <InstructorCard instructor={mapInstructorData(instructor)} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Instructors;
