# Integração Frontend-Backend

## Visão Geral

O frontend Auto-Rota foi integrado com o backend NestJS, permitindo comunicação completa entre as camadas da aplicação.

## Estrutura de Integração

### 1. Cliente HTTP (Axios)

**Arquivo:** `src/lib/api.ts`

- Cliente Axios configurado com:
  - Base URL do backend via variável de ambiente
  - Interceptor de requisições para adicionar token JWT
  - Interceptor de respostas para refresh automático de token
  - Tratamento de erros 401 (não autorizado)

### 2. Serviços de API

Todos os serviços estão em `src/services/`:

#### Auth Service (`auth.service.ts`)
- `register(data)` - Registro de usuário
- `login(data)` - Login e obtenção de tokens
- `logout()` - Limpar tokens e sessão
- `getProfile()` - Buscar dados do usuário logado
- `getCurrentUser()` - Obter usuário do localStorage
- `isAuthenticated()` - Verificar se há sessão ativa

#### Instructors Service (`instructors.service.ts`)
- `list(filters)` - Listar instrutores com filtros
- `getById(id)` - Buscar instrutor por ID
- `create(data)` - Criar perfil de instrutor
- `update(id, data)` - Atualizar perfil de instrutor

#### Categories Service (`categories.service.ts`)
- `list()` - Listar categorias CNH
- `getById(id)` - Buscar categoria por ID

#### Lessons Service (`lessons.service.ts`)
- `list()` - Listar aulas
- `getById(id)` - Buscar aula por ID
- `create(data)` - Agendar nova aula
- `update(id, data)` - Atualizar aula
- `cancel(id, reason)` - Cancelar aula

### 3. Context API

**Arquivo:** `src/contexts/AuthContext.tsx`

- Gerencia estado global de autenticação
- Provê funções de login, registro e logout
- Persiste estado do usuário no localStorage
- Disponibiliza hook `useAuth()` para todos os componentes

### 4. React Query Hooks

Hooks personalizados em `src/hooks/`:

#### useInstructors.ts
- `useInstructors(filters)` - Query para lista de instrutores
- `useInstructor(id)` - Query para instrutor específico
- `useCreateInstructor()` - Mutation para criar instrutor
- `useUpdateInstructor()` - Mutation para atualizar instrutor

#### useLessons.ts
- `useLessons()` - Query para lista de aulas
- `useLesson(id)` - Query para aula específica
- `useCreateLesson()` - Mutation para criar aula
- `useUpdateLesson()` - Mutation para atualizar aula
- `useCancelLesson()` - Mutation para cancelar aula

#### useCategories.ts
- `useCategories()` - Query para lista de categorias
- `useCategory(id)` - Query para categoria específica

### 5. Componentes de Autenticação

#### LoginForm (`components/auth/LoginForm.tsx`)
- Formulário de login com validação
- Tratamento de erros
- Redirecionamento após sucesso

#### RegisterForm (`components/auth/RegisterForm.tsx`)
- Formulário de cadastro completo
- Seleção de tipo de conta (Aluno/Instrutor)
- Validação de campos obrigatórios

#### Auth Page (`pages/Auth.tsx`)
- Página com tabs para login e registro
- Layout responsivo

### 6. Páginas Atualizadas

#### Instructors (`pages/Instructors.tsx`)
- Integrada com `useInstructors` hook
- Carrega dados reais da API
- Loading states e error handling
- Filtros funcionais (categoria, cidade)

#### Header (`components/layout/Header.tsx`)
- Exibe avatar do usuário quando logado
- Menu dropdown com perfil e logout
- Botões de login/cadastro quando não logado

## Configuração

### Variáveis de Ambiente

Arquivo `.env`:
```env
VITE_API_URL=http://localhost:3000/api/v1
```

Para produção, altere para a URL da API em produção.

### React Query

Configurado em `src/main.tsx` com:
- `staleTime`: 5 minutos (cache de dados)
- `retry`: 1 tentativa em caso de erro

## Fluxo de Autenticação

1. **Login:**
   - Usuário preenche email e senha
   - Frontend envia POST para `/auth/login`
   - Backend retorna `accessToken` e `refreshToken`
   - Tokens são salvos no localStorage
   - Usuário é redirecionado

2. **Requisições Autenticadas:**
   - Interceptor adiciona `Authorization: Bearer {token}`
   - Backend valida token JWT
   - Se token expirado (401), tenta refresh automático

3. **Refresh Token:**
   - Interceptor detecta 401
   - Envia `refreshToken` para `/auth/refresh`
   - Obtém novo `accessToken`
   - Repete requisição original

4. **Logout:**
   - Remove tokens do localStorage
   - Limpa estado do usuário
   - Redireciona para home

## Tratamento de Erros

- **401 Unauthorized**: Tenta refresh automático, se falhar, desloga
- **Erros de rede**: Exibidos em toast notifications
- **Validação**: Mensagens do backend exibidas nos formulários
- **Loading states**: Spinners durante requisições

## Próximos Passos

1. **Dashboard do Instrutor:**
   - Integrar com endpoints de aulas
   - Gerenciamento de disponibilidade
   - Upload de credenciais (CNH, certificados)

2. **Agendamento de Aulas:**
   - Formulário completo de agendamento
   - Seleção de horários disponíveis
   - Integração com pagamentos

3. **Sistema de Avaliações:**
   - Listagem de reviews
   - Formulário de avaliação
   - Cálculo de média de notas

4. **Chat em Tempo Real:**
   - WebSocket com Socket.io
   - Mensagens entre aluno e instrutor

5. **Notificações:**
   - Push notifications
   - Email notifications
   - SMS notifications

## Dependências Adicionadas

```json
{
  "axios": "^1.6.0"
}
```

Já instaladas:
- `@tanstack/react-query`: Gerenciamento de estado assíncrono
- `react-router-dom`: Roteamento

## Testes

Para testar a integração:

1. **Iniciar backend:**
   ```bash
   cd cnh-brasil-back
   docker-compose up -d
   npm run start:dev
   ```

2. **Iniciar frontend:**
   ```bash
   cd cnh-brasil
   npm run dev
   ```

3. **Criar conta:**
   - Acesse http://localhost:5173/auth
   - Preencha formulário de cadastro
   - Clique em "Criar Conta"

4. **Fazer login:**
   - Use email e senha cadastrados
   - Verifique redirect para /instrutores

5. **Listar instrutores:**
   - Navegue para /instrutores
   - Verifique loading state
   - Veja lista de instrutores da API

## Troubleshooting

### CORS Error
Se aparecer erro de CORS, verifique se o backend está com CORS habilitado em `main.ts`:
```typescript
app.enableCors();
```

### 401 Unauthorized
- Verifique se o token está sendo enviado no header
- Confira se o token não expirou
- Teste refresh token

### Dados não aparecem
- Abra DevTools > Network
- Verifique se a requisição foi feita
- Veja status code e resposta
- Confira se há dados no banco (Prisma Studio)

### Token não persiste
- Verifique localStorage no DevTools
- Confirme que authService.login está salvando tokens
- Teste em navegador sem extensões/bloqueadores
