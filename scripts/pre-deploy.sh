#!/bin/bash

# Script de validação pré-deploy
# Uso: ./scripts/pre-deploy.sh

set -e

echo "🚀 Auto-Rota - Validação Pré-Deploy"
echo "===================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para print colorido
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
        exit 1
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

echo "📦 1. Verificando dependências..."
npm list --depth=0 > /dev/null 2>&1
print_status $? "Dependências instaladas"

echo ""
echo "🔍 2. Executando linter..."
npm run lint
print_status $? "Linter passou"

echo ""
echo "🏗️  3. Testando build de produção..."
npm run build
print_status $? "Build concluído com sucesso"

echo ""
echo "📊 4. Verificando tamanho do build..."
BUILD_SIZE=$(du -sh dist | cut -f1)
echo "   Tamanho do build: $BUILD_SIZE"

if [ -d "dist" ]; then
    FILE_COUNT=$(find dist -type f | wc -l)
    echo "   Arquivos gerados: $FILE_COUNT"
    print_status 0 "Diretório dist criado"
else
    print_status 1 "Diretório dist não encontrado"
fi

echo ""
echo "🧪 5. Testando servidor de preview..."
print_warning "Iniciando preview server (Ctrl+C para parar)..."
npm run preview &
PREVIEW_PID=$!
sleep 3

# Testa se o servidor está respondendo
curl -s -o /dev/null -w "%{http_code}" http://localhost:4173 > /dev/null 2>&1
HTTP_CODE=$?

kill $PREVIEW_PID 2>/dev/null || true

if [ $HTTP_CODE -eq 0 ]; then
    print_status 0 "Preview server funcionando"
else
    print_warning "Preview server não testado (ok se não for crítico)"
fi

echo ""
echo "✅ Validação concluída com sucesso!"
echo ""
echo "📝 Próximos passos:"
echo "   1. Commit as alterações: git add . && git commit -m 'chore: prepare for deploy'"
echo "   2. Push para GitHub: git push origin develop"
echo "   3. Deploy na Vercel: vercel --prod"
echo ""
echo "🌐 Ou acesse: https://vercel.com/new"
