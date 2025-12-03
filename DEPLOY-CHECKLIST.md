# ✅ Checklist de Deploy - Auto-Rota

## Pré-Deploy (Completo)

- [x] Arquivo `vercel.json` criado (SPA routing + cache)
- [x] `.gitignore` atualizado (pasta `.vercel`)
- [x] `package.json` atualizado (nome, versão, scripts)
- [x] CSS corrigido (`@import` antes do `@tailwind`)
- [x] Build de produção testado e funcionando ✓
- [x] README atualizado com instruções de deploy
- [x] Guia detalhado criado (`DEPLOY.md`)
- [x] Script de validação criado (`scripts/pre-deploy.sh`)
- [x] Arquivo `.env.example` criado

## Próximos Passos para Deploy

### 1. Commit e Push (FAÇA ISSO AGORA)

```bash
git add .
git commit -m "chore: prepare frontend for production deploy"
git push origin develop
```

### 2. Deploy na Vercel (Escolha uma opção)

#### Opção A: Interface Web (Mais Fácil) ⭐

1. Acesse: https://vercel.com/new
2. Conecte o repositório `fabiobbsa/cnh-brasil`
3. Configure:
   - **Project Name:** `auto-rota`
   - **Framework:** Vite (detectado automaticamente)
   - **Branch:** `develop` ou `main`
4. Clique em **Deploy**

#### Opção B: CLI (Rápido)

```bash
# Instalar CLI (apenas uma vez)
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 3. Configurar Domínio autorota.com

#### Na Vercel:
1. Dashboard → Settings → Domains
2. Adicione: `autorota.com` e `www.autorota.com`

#### No seu Registrador de Domínio:

**Registro A (autorota.com):**
```
Tipo: A
Nome: @
Valor: 76.76.21.21
TTL: 3600
```

**Registro CNAME (www):**
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
TTL: 3600
```

⏰ Aguarde propagação DNS: 5 min - 48h

## Verificação Final

Após deploy, teste:

- [ ] `https://auto-rota.vercel.app` carrega
- [ ] Todas as rotas funcionam:
  - [ ] `/` (Home)
  - [ ] `/instrutores` (Listagem)
  - [ ] `/instrutor/dashboard` (Dashboard)
- [ ] Fontes carregam corretamente
- [ ] Imagens aparecem
- [ ] Mobile responsivo
- [ ] SSL ativo (cadeado verde)

## Recursos Criados

| Arquivo | Descrição |
|---------|-----------|
| `vercel.json` | Configuração Vercel (routing, cache) |
| `DEPLOY.md` | Guia completo de deploy |
| `scripts/pre-deploy.sh` | Script de validação |
| `.env.example` | Exemplo de variáveis de ambiente |

## Comandos Úteis

```bash
# Build local
npm run build

# Preview do build
npm run preview

# Deploy direto (requer Vercel CLI)
npm run deploy

# Preview deploy
npm run deploy:preview

# Validar antes do deploy
./scripts/pre-deploy.sh
```

## Suporte

- 📖 Documentação Vercel: https://vercel.com/docs
- 📋 Guia completo: Veja `DEPLOY.md`
- 🐛 Issues: https://github.com/fabiobbsa/cnh-brasil/issues

---

## 🎉 Está tudo pronto!

O frontend está **100% preparado** para deploy em produção.

**Tempo estimado até o site estar no ar:** 10-15 minutos

**Próximo passo:** Faça o commit e escolha uma das opções de deploy acima.
