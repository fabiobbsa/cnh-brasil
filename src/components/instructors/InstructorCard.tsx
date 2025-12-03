import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Car, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  location: string;
  categories: string[];
  pricePerHour: number;
  experience: string;
  nextAvailable: string;
  verified: boolean;
}

interface InstructorCardProps {
  instructor: Instructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <Card className="hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="relative">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-20 h-20 rounded-2xl object-cover"
            />
            {instructor.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-accent-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-foreground truncate">{instructor.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-foreground">{instructor.rating}</span>
                  <span className="text-sm text-muted-foreground">({instructor.reviewCount})</span>
                </div>
              </div>
              {instructor.verified && (
                <Badge variant="verified" className="shrink-0">Verificado</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{instructor.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Car className="w-4 h-4" />
            <span>{instructor.categories.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Próximo: {instructor.nextAvailable}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">R$ {instructor.pricePerHour}</span>
            <span className="text-sm text-muted-foreground">/hora</span>
          </div>
          <Button asChild>
            <Link to={`/instrutor/${instructor.id}/agendar`}>Agendar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
