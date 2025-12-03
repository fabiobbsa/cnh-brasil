# 🚀 Guia de Deploy - Auto-Rota

## Deploy no Vercel com Domínio Customizado

### Pré-requisitos

- [ ] Conta no [Vercel](https://vercel.com)
- [ ] Repositório no GitHub com código atualizado
- [ ] Domínio `autorota.com` registrado e ativo
- [ ] Acesso ao painel DNS do registrador de domínio

---

## 📝 Passo a Passo Completo

### 1. Preparar o Repositório

```bash
# Certifique-se de que está na branch correta
git checkout develop

# Commit todas as alterações
git add .
git commit -m "chore: prepare for production deploy"

# Push para o GitHub
git push origin develop
```

### 2. Conectar ao Vercel

#### Via Interface Web (Mais Fácil)

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em **"Import Git Repository"**
3. Selecione o repositório `fabiobbsa/cnh-brasil`
4. Configure o projeto:
   - **Project Name:** `auto-rota`
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **"Deploy"**

#### Via CLI (Alternativa)

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Login na Vercel
vercel login

# Deploy inicial (preview)
vercel

# Deploy em produção
vercel --prod
```

### 3. Configurar Domínio Customizado

#### No Dashboard da Vercel

1. Vá para o projeto **auto-rota**
2. Clique em **Settings** → **Domains**
3. Adicione os domínios:
   - `autorota.com`
   - `www.autorota.com`

#### Configurar DNS no Registrador

Configure os seguintes registros DNS no painel do seu registrador (GoDaddy, Registro.br, etc):

**Para autorota.com:**
```
Tipo: A
Nome: @
Valor: 76.76.21.21
TTL: 3600
```

**Para www.autorota.com:**
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
TTL: 3600
```

**Opcional - Verificação:**
```
Tipo: TXT
Nome: _vercel
Valor: [código fornecido pela Vercel]
TTL: 3600
```

> ⏰ **Nota:** A propagação DNS pode levar de 5 minutos a 48 horas

#### Verificar Configuração DNS

```bash
# Verificar registro A
dig autorota.com

# Verificar CNAME
dig www.autorota.com

# Ou use nslookup
nslookup autorota.com
```

### 4. Configurar Variáveis de Ambiente (Quando necessário)

No dashboard da Vercel:

1. **Settings** → **Environment Variables**
2. Adicione as variáveis:

```env
# Exemplo de variáveis futuras
VITE_API_URL=https://api.autorota.com
VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx
VITE_APP_ENV=production
```

### 5. Configurar Deploy Automático

Por padrão, a Vercel já configura:

- ✅ Deploy automático a cada push na branch `main`
- ✅ Preview deploys para PRs
- ✅ HTTPS automático com SSL gratuito
- ✅ CDN global

**Para mudar a branch de produção:**
1. **Settings** → **Git**
2. Em **Production Branch**, altere para `develop`

### 6. Otimizações Recomendadas

#### Analytics (Opcional)

1. **Analytics** → Enable Vercel Analytics
2. Monitore performance e Core Web Vitals

#### Cache Headers (Já configurado)

O arquivo `vercel.json` já inclui cache otimizado para assets.

#### Proteção contra Bots

1. **Settings** → **Security**
2. Ative **Vercel Firewall** (plano Pro)

---

## 🔍 Verificação Pós-Deploy

### Checklist Final

- [ ] Site acessível via `https://autorota.com`
- [ ] Redirecionamento `www.autorota.com` → `autorota.com` funcionando
- [ ] HTTPS ativo (cadeado verde)
- [ ] Todas as páginas carregando:
  - [ ] `/` - Home
  - [ ] `/instrutores` - Lista de instrutores
  - [ ] `/instrutor/dashboard` - Dashboard
- [ ] Fontes carregando corretamente
- [ ] Imagens e assets funcionando
- [ ] Responsividade mobile OK
- [ ] Sem erros no console do navegador

### Testar Performance

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --collect.url=https://autorota.com
```

Ou use: [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 🔧 Troubleshooting

### Problema: "Domain is not configured"

**Solução:** Aguarde propagação DNS ou force refresh:
```bash
vercel domains verify autorota.com
```

### Problema: "404 on page refresh"

**Solução:** Já configurado no `vercel.json` com rewrites para SPA.

### Problema: "Build failed"

**Solução:** Verifique logs na Vercel e rode localmente:
```bash
npm run build
npm run preview
```

### Problema: Fontes não carregam

**Solução:** Já corrigido no `index.css` com `@import` no topo.

---

## 📊 Monitoramento

### Vercel Dashboard

- **Analytics:** Visualizações, geografia, performance
- **Logs:** Erros e warnings em tempo real
- **Deployments:** Histórico completo de deploys

### Métricas Importantes

- **First Contentful Paint (FCP):** < 1.8s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.8s
- **Cumulative Layout Shift (CLS):** < 0.1

---

## 🔄 Workflow de Deploy Contínuo

### Branches Strategy

```
main/master     → Produção (autorota.com)
develop         → Staging (auto-rota-git-develop.vercel.app)
feature/*       → Preview deploys automáticos
```

### Processo de Release

1. Desenvolva em branch `feature/nova-funcionalidade`
2. Push → gera preview deploy automático
3. Teste no preview deploy
4. Merge para `develop` → deploy em staging
5. Teste em staging
6. Merge para `main` → deploy em produção

---

## 🎉 Deploy Completo!

Seu projeto estará disponível em:
- 🌐 **Produção:** https://autorota.com
- 🔍 **Preview:** https://auto-rota.vercel.app

**Tempo médio total:** 15-30 minutos (incluindo propagação DNS)
