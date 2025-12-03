# Auto-Rota 🚗

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg)

**Auto-Rota** é uma plataforma inovadora que conecta candidatos à CNH com instrutores de trânsito autônomos credenciados pelo Detran, proporcionando economia de até 80% em relação às auto-escolas tradicionais e total flexibilidade no agendamento de aulas práticas.

## 📋 Sobre o Projeto

A plataforma foi desenvolvida em conformidade com a nova Resolução Contran, que permite a contratação direta de instrutores autônomos para aulas práticas de direção. O Auto-Rota atua como um marketplace, facilitando a conexão entre alunos e instrutores qualificados, com integração ao sistema Renach para registro oficial das aulas.

### 🎯 Principais Funcionalidades

#### Para Alunos
- 🔍 Busca avançada de instrutores por localização, categoria e disponibilidade
- ⭐ Sistema de avaliações e reputação de instrutores
- 💰 Comparação transparente de preços (R$ 65-90/hora)
- 📅 Agendamento flexível de aulas práticas
- 🛡️ Verificação de credenciais e certificações dos instrutores

#### Para Instrutores
- 📊 Dashboard completo com métricas e estatísticas
- 📆 Gerenciamento de agenda e disponibilidade
- 👥 Controle de alunos e histórico de aulas
- 💼 Relatórios financeiros e controle de faturamento
- ✅ Registro automático de aulas no Renach
- 📄 Gestão de documentação e credenciamento

## 🚀 Tecnologias

Este projeto utiliza as mais modernas tecnologias do ecossistema React:

- **[React 18.3](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript 5.8](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Vite](https://vitejs.dev/)** - Build tool de alta performance
- **[React Router DOM v6](https://reactrouter.com/)** - Roteamento declarativo
- **[TanStack Query](https://tanstack.com/query/)** - Gerenciamento de estado assíncrono
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Shadcn/ui](https://ui.shadcn.com/)** - Componentes UI acessíveis e customizáveis
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first

## 📦 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ ([instalar com nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm ou yarn

### Passos para Instalação

```bash
# Clone o repositório
git clone https://github.com/fabiobbsa/cnh-brasil.git

# Entre no diretório do projeto
cd cnh-brasil

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🚀 Deploy

### Deploy no Vercel

Este projeto está configurado para deploy automático no Vercel.

#### Opção 1: Deploy via GitHub (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "Add New Project"
4. Importe o repositório `fabiobbsa/cnh-brasil`
5. Configure as variáveis (se necessário)
6. Clique em "Deploy"

#### Opção 2: Deploy via CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### Configurar Domínio Customizado

1. No dashboard da Vercel, vá em **Settings** > **Domains**
2. Adicione `autorota.com` e `www.autorota.com`
3. Configure os registros DNS no seu provedor:
   - **Tipo A**: Aponte para o IP da Vercel
   - **Tipo CNAME**: `www` → `cname.vercel-dns.com`
4. Aguarde propagação DNS (até 48h)

### Variáveis de Ambiente

Para configurar variáveis de ambiente na Vercel:

1. Acesse **Settings** > **Environment Variables**
2. Adicione as variáveis necessárias para cada ambiente:
   - `VITE_API_URL` - URL da API backend (quando disponível)
   - `VITE_STRIPE_KEY` - Chave pública do Stripe
   - Outras conforme necessário

## 🛠️ Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build de produção
npm run build:dev    # Build em modo desenvolvimento
npm run lint         # Executa linter
npm run preview      # Preview do build de produção
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes primitivos (shadcn/ui)
│   ├── home/           # Componentes da landing page
│   ├── instructors/    # Componentes de instrutores
│   └── layout/         # Componentes de layout
├── pages/              # Páginas da aplicação
│   ├── Index.tsx       # Landing page
│   ├── Instructors.tsx # Listagem de instrutores
│   ├── InstructorDashboard.tsx # Dashboard do instrutor
│   └── NotFound.tsx    # Página 404
├── hooks/              # Custom React hooks
├── lib/                # Utilitários e helpers
├── App.tsx             # Componente raiz com rotas
└── main.tsx            # Entry point da aplicação
```

## 🎨 Design System

O projeto utiliza um design system completo baseado em:

- **Paleta de cores**: Sistema HSL com suporte a dark mode
- **Tipografia**: Plus Jakarta Sans
- **Componentes**: 40+ componentes UI consistentes e acessíveis
- **Animações**: Transições suaves com `tailwindcss-animate`
- **Responsividade**: Mobile-first com breakpoints otimizados

## 🔒 Segurança e Conformidade

- ✅ Integração com sistema Renach (Detran)
- ✅ Verificação de credenciais de instrutores
- ✅ Validação de certificações e documentação
- ✅ Registro oficial de aulas práticas
- ✅ Conformidade com Resolução Contran

## 🚧 Roadmap

- [ ] Implementação de backend/API REST
- [ ] Sistema de autenticação e autorização
- [ ] Integração real com API Renach
- [ ] Gateway de pagamento (PIX, cartão)
- [ ] Sistema de chat em tempo real
- [ ] Notificações push e email
- [ ] App mobile (React Native)
- [ ] Sistema de geolocalização
- [ ] Inteligência artificial para recomendações

## 👥 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

**Desenvolvedor**: Fabio Barbosa  
**Repositório**: [github.com/fabiobbsa/cnh-brasil](https://github.com/fabiobbsa/cnh-brasil)

---

Desenvolvido com ❤️ para tornar o processo de obtenção da CNH mais acessível e econômico para todos os brasileiros.
