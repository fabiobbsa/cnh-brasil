import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle,
  FileText,
  Star,
  Bell
} from "lucide-react";

const upcomingLessons = [
  {
    id: "1",
    student: "João Silva",
    date: "Hoje",
    time: "14:00 - 16:00",
    category: "B",
    status: "confirmada",
  },
  {
    id: "2",
    student: "Maria Santos",
    date: "Hoje",
    time: "17:00 - 19:00",
    category: "A",
    status: "confirmada",
  },
  {
    id: "3",
    student: "Pedro Costa",
    date: "Amanhã",
    time: "09:00 - 11:00",
    category: "B",
    status: "pendente",
  },
];

const stats = [
  { label: "Aulas este mês", value: "24", icon: Calendar, change: "+12%" },
  { label: "Alunos ativos", value: "8", icon: Users, change: "+3" },
  { label: "Faturamento", value: "R$ 1.920", icon: DollarSign, change: "+18%" },
  { label: "Avaliação média", value: "4.9", icon: Star, change: "0" },
];

const InstructorDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Olá, Carlos! 👋
              </h1>
              <p className="text-muted-foreground">
                Você tem 2 aulas agendadas para hoje
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Bell className="w-4 h-4" />
                Notificações
              </Button>
              <Button>
                <Calendar className="w-4 h-4" />
                Gerenciar Agenda
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card 
                key={stat.label}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary">{stat.change}</Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upcoming Lessons */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Próximas Aulas</CardTitle>
                  <Button variant="ghost" size="sm">Ver todas</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingLessons.map((lesson) => (
                      <div 
                        key={lesson.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                            <span className="text-lg font-bold text-primary-foreground">
                              {lesson.category}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{lesson.student}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{lesson.date}, {lesson.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant={lesson.status === "confirmada" ? "success" : "secondary"}
                          >
                            {lesson.status}
                          </Badge>
                          <Button size="sm">Detalhes</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle className="w-4 h-4" />
                    Registrar Aula no Renach
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4" />
                    Ver Documentos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4" />
                    Meus Alunos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="w-4 h-4" />
                    Relatório Financeiro
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status de Credencial</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-xl border border-accent/20">
                    <CheckCircle className="w-6 h-6 text-accent" />
                    <div>
                      <p className="font-semibold text-foreground">Credenciado</p>
                      <p className="text-sm text-muted-foreground">Válido até 12/2026</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">CNH</span>
                      <Badge variant="success">Válida</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Credencial Detran</span>
                      <Badge variant="success">Ativa</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Curso Formação</span>
                      <Badge variant="success">Completo</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InstructorDashboard;
