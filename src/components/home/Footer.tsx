import { Link } from "react-router-dom";
import { Car } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Auto-Rota</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Solução homologada pela Senatran para conectar candidatos à CNH 
              com instrutores autônomos credenciados.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Para Alunos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/instrutores" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Encontrar Instrutor
                </Link>
              </li>
              <li>
                <Link to="/como-funciona" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link to="/precos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Preços
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Para Instrutores</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/instrutor/cadastro" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cadastre-se
                </Link>
              </li>
              <li>
                <Link to="/instrutor/requisitos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Requisitos
                </Link>
              </li>
              <li>
                <Link to="/instrutor/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacidade" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Auto-Rota. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Solução homologada Senatran • Integrado ao Renach
          </p>
        </div>
      </div>
    </footer>
  );
}
