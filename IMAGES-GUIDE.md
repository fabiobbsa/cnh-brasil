# 📸 Guia de Imagens - Auto-Rota

## Imagens Necessárias

### 1. **Open Graph Image** (Thumbnail de Compartilhamento)
**Arquivo:** `public/og-image.png`
- **Dimensões:** 1200 x 630 pixels
- **Formato:** PNG ou JPG
- **Peso máximo:** 1 MB

**Conteúdo sugerido:**
- Logo "Auto-Rota" proeminente
- Texto: "CNH com até 80% de economia"
- Imagem de fundo relacionada (carro, volante, estrada)
- Cores da marca (azul #0EA5E9, verde #10B981)

**Ferramentas para criar:**
- [Canva](https://www.canva.com) - Template "Facebook Post"
- [Figma](https://www.figma.com)
- Photoshop/GIMP

---

### 2. **Favicon** (Ícone do Navegador)
**Arquivo:** `public/favicon.ico`
- **Dimensões:** 32x32 ou 16x16 pixels
- **Formato:** ICO (ou PNG convertido para ICO)

**Conteúdo:**
- Logo simplificado da Auto-Rota
- Iniciais "AR" estilizadas
- Ícone de carro minimalista

**Ferramentas:**
- [Favicon.io](https://favicon.io) - Gerador online
- [RealFaviconGenerator](https://realfavicongenerator.net)

---

### 3. **Fotos de Instrutores** (Opcional - se tiver fotos reais)
**Localização:** `src/pages/Instructors.tsx` (linhas 10-61)

**Opções:**
1. **Usar fotos reais** dos instrutores cadastrados
2. **Manter Unsplash** temporariamente (fotos genéricas gratuitas)
3. **Usar avatares ilustrados** (mais profissional para mockups)

**Se usar fotos reais:**
- Formato: JPG ou WebP
- Dimensões: 400x400px (quadrado)
- Salvar em: `public/instructors/`
- Exemplo: `public/instructors/carlos-silva.jpg`

---

## 🎨 Como Adicionar as Imagens

### Passo 1: Criar/Baixar as Imagens

Crie ou obtenha as imagens seguindo as especificações acima.

### Passo 2: Adicionar ao Projeto

Coloque os arquivos na pasta `public/`:

```
public/
├── og-image.png          ← Nova (1200x630px)
├── favicon.ico           ← Substituir
├── logo.png              ← Opcional
├── instructors/          ← Nova pasta (opcional)
│   ├── carlos-silva.jpg
│   ├── ana-paula.jpg
│   └── ...
└── robots.txt           ← Manter
```

### Passo 3: Commit e Deploy

```bash
git add public/
git commit -m "feat: add custom images and branding"
git push origin develop
```

A Vercel fará deploy automático e as novas imagens aparecerão!

---

## ✅ Verificação

Após o deploy, teste o compartilhamento:

### Facebook Debugger
https://developers.facebook.com/tools/debug/
- Cole a URL: `https://autorota.com`
- Clique em "Scrape Again" para forçar atualização

### Twitter Card Validator
https://cards-dev.twitter.com/validator
- Cole a URL e valide

### LinkedIn Post Inspector
https://www.linkedin.com/post-inspector/
- Cole a URL para preview

---

## 📋 Checklist de Imagens

- [ ] **og-image.png** criado (1200x630px)
- [ ] **favicon.ico** criado (32x32px)
- [ ] Imagens adicionadas em `public/`
- [ ] `index.html` atualizado ✓ (já feito)
- [ ] Commit e push realizados
- [ ] Deploy na Vercel concluído
- [ ] Testado compartilhamento no Facebook
- [ ] Testado compartilhamento no Twitter/X
- [ ] Testado compartilhamento no LinkedIn
- [ ] Testado compartilhamento no WhatsApp

---

## 🎨 Templates Prontos (Use como inspiração)

### Open Graph Image - Sugestão de Layout:

```
┌─────────────────────────────────────────┐
│                                         │
│           [LOGO AUTO-ROTA]              │
│                                         │
│     CNH com até 80% de economia        │
│                                         │
│   Instrutores autônomos credenciados   │
│          pelo Detran                    │
│                                         │
│     [Imagem de carro/volante]          │
│                                         │
│          autorota.com                   │
│                                         │
└─────────────────────────────────────────┘
```

### Cores da Marca (use no design):
- **Primary Blue:** #0EA5E9
- **Accent Green:** #10B981
- **Background:** #F8FAFC
- **Text:** #0F172A

---

## 💡 Recursos Gratuitos

### Imagens de Stock (temporárias):
- [Unsplash](https://unsplash.com) - Fotos gratuitas
- [Pexels](https://www.pexels.com) - Fotos gratuitas
- [Pixabay](https://pixabay.com) - Fotos gratuitas

### Ícones:
- [Lucide](https://lucide.dev) - Já usado no projeto
- [Heroicons](https://heroicons.com)

### Geração de Logo/Imagens:
- [Canva](https://www.canva.com) - Gratuito com templates
- [Figma](https://www.figma.com) - Gratuito
- [Photopea](https://www.photopea.com) - Photoshop online grátis

---

## 🚀 Próximos Passos

1. Crie a **og-image.png** (use Canva com template 1200x630)
2. Crie o **favicon.ico** (use favicon.io)
3. Adicione ambos em `public/`
4. Faça commit e push
5. Teste o compartilhamento!

**Quer ajuda para criar as imagens? Posso sugerir ferramentas ou layouts específicos!**
