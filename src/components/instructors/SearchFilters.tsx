import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  location: string;
  category: string;
  maxPrice: string;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">Filtros</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                id="location" 
                placeholder="Cidade ou bairro" 
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <div className="flex flex-wrap gap-2">
              {["Categoria A", "Categoria B", "A e B"].map((cat) => (
                <Button key={cat} variant="outline" size="sm" className="text-xs">
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Preço máximo (R$/hora)</Label>
            <Input 
              id="price" 
              type="number" 
              placeholder="Ex: 100"
            />
          </div>

          <div className="space-y-2">
            <Label>Disponibilidade</Label>
            <div className="flex flex-wrap gap-2">
              {["Hoje", "Esta semana", "Flexível"].map((opt) => (
                <Button key={opt} variant="outline" size="sm" className="text-xs">
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          <Button className="w-full mt-4">
            <Search className="w-4 h-4" />
            Buscar Instrutores
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
