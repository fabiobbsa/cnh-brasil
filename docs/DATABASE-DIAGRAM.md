# 🎯 Diagrama ER - Auto-Rota

## Diagrama de Entidades e Relacionamentos (Versão Visual)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SISTEMA AUTO-ROTA                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐
│    USERS     │ (Tabela Base)
├──────────────┤
│ id (PK)      │
│ email        │◄─────────┐
│ password     │          │
│ full_name    │          │
│ cpf          │          │
│ role         │          │ (1:1) OU (1:0)
│ phone        │          │
│ address      │          │
│ latitude     │          │
│ longitude    │          │
│ created_at   │          │
└──────────────┘          │
       │                  │
       │ (1:N)            │
       │                  │
       ▼                  │
┌──────────────┐          │
│ INSTRUCTORS  │◄─────────┘
├──────────────┤
│ id (PK)      │
│ user_id (FK) │
│ price_hour   │
│ rating       │─────────┐
│ experience   │         │ (1:1)
│ verified     │         │
│ is_available │         │
└──────────────┘         │
       │                 │
       │ (1:1)           ▼
       │         ┌────────────────────┐
       │         │ INSTRUCTOR_        │
       │         │ CREDENTIALS        │
       │         ├────────────────────┤
       │         │ id (PK)            │
       │         │ instructor_id (FK) │
       │         │ cnh_number         │
       │         │ detran_credential  │
       │         │ expiry_date        │
       │         │ status             │
       │         └────────────────────┘
       │
       │ (1:N)
       │
       ▼
┌────────────────────┐
│ INSTRUCTOR_        │
│ AVAILABILITY       │
├────────────────────┤
│ id (PK)            │
│ instructor_id (FK) │
│ date               │
│ start_time         │
│ end_time           │
│ is_available       │
└────────────────────┘

       │ (N:M via junction)
       │
       ▼
┌────────────────────┐        ┌──────────────┐
│ INSTRUCTOR_        │◄──────►│ CATEGORIES   │
│ CATEGORIES         │        ├──────────────┤
├────────────────────┤        │ id (PK)      │
│ id (PK)            │        │ code (A,B,C) │
│ instructor_id (FK) │        │ name         │
│ category_id (FK)   │        │ vehicle_type │
└────────────────────┘        └──────────────┘


┌──────────────────────────────────────────────────────────────────┐
│                        CORE: LESSONS                              │
│                     (Tabela Central)                              │
└──────────────────────────────────────────────────────────────────┘

         USERS                  INSTRUCTORS              CATEGORIES
           │                         │                        │
           │ (N:1)                   │ (N:1)                  │ (N:1)
           │                         │                        │
           └─────────────┐           │           ┌───────────┘
                         │           │           │
                         ▼           ▼           ▼
                    ┌─────────────────────────────┐
                    │        LESSONS              │
                    ├─────────────────────────────┤
                    │ id (PK)                     │
                    │ instructor_id (FK)          │
                    │ student_id (FK)             │
                    │ category_id (FK)            │
                    │ scheduled_date              │
                    │ scheduled_time              │
                    │ status                      │
                    │ price_agreed                │
                    │ pickup_location             │
                    │ instructor_notes            │
                    └─────────────────────────────┘
                         │      │      │
                         │      │      │
          ┌──────────────┘      │      └──────────────┐
          │ (1:1)               │ (1:1)                │ (1:1)
          │                     │                      │
          ▼                     ▼                      ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   PAYMENTS      │   │    REVIEWS      │   │ RENACH_RECORDS  │
├─────────────────┤   ├─────────────────┤   ├─────────────────┤
│ id (PK)         │   │ id (PK)         │   │ id (PK)         │
│ lesson_id (FK)  │   │ lesson_id (FK)  │   │ lesson_id (FK)  │
│ amount          │   │ rating (1-5)    │   │ protocol        │
│ method          │   │ comment         │   │ status          │
│ status          │   │ punctuality     │   │ response        │
│ gateway_id      │   │ teaching        │   │ registered_at   │
│ paid_at         │   │ patience        │   └─────────────────┘
└─────────────────┘   │ vehicle         │
                      │ is_public       │
                      └─────────────────┘


┌──────────────────────────────────────────────────────────────────┐
│                   FEATURES ADICIONAIS                             │
└──────────────────────────────────────────────────────────────────┘

      USERS                    USERS
        │                        │
        │ (1:N)                  │ (N:1)
        ▼                        ▼
┌─────────────────┐      ┌─────────────────┐
│ NOTIFICATIONS   │      │   MESSAGES      │
├─────────────────┤      ├─────────────────┤
│ id (PK)         │      │ id (PK)         │
│ user_id (FK)    │      │ sender_id (FK)  │
│ type            │      │ recipient_id    │
│ title           │      │ content         │
│ message         │      │ is_read         │
│ is_read         │      │ created_at      │
│ channel         │      └─────────────────┘
└─────────────────┘


   USERS (student)          INSTRUCTORS
        │                        │
        │ (N:M)                  │
        └────────┐      ┌────────┘
                 │      │
                 ▼      ▼
           ┌─────────────────┐
           │   FAVORITES     │
           ├─────────────────┤
           │ id (PK)         │
           │ student_id (FK) │
           │ instructor_id   │
           │ created_at      │
           └─────────────────┘


           USERS (admin)
                 │
                 │ (1:N)
                 ▼
           ┌─────────────────┐
           │  ADMIN_LOGS     │
           ├─────────────────┤
           │ id (PK)         │
           │ admin_user_id   │
           │ action          │
           │ entity_type     │
           │ entity_id       │
           │ description     │
           └─────────────────┘
```

---

## 📊 Resumo de Cardinalidades

| Relação                          | Tipo  | Descrição                                |
|----------------------------------|-------|------------------------------------------|
| users → instructors              | 1:1   | Um usuário pode ser 1 instrutor          |
| instructors → credentials        | 1:1   | Cada instrutor tem 1 credencial          |
| instructors → availability       | 1:N   | Instrutor tem N slots de horário         |
| instructors ↔ categories         | N:M   | Instrutor ensina várias categorias       |
| lessons → instructor             | N:1   | Aula pertence a 1 instrutor              |
| lessons → student (user)         | N:1   | Aula pertence a 1 aluno                  |
| lessons → category               | N:1   | Aula é de 1 categoria                    |
| lessons → payment                | 1:1   | Cada aula tem 1 pagamento                |
| lessons → review                 | 1:1   | Cada aula pode ter 1 avaliação           |
| lessons → renach_record          | 1:1   | Cada aula tem 1 registro Renach          |
| users → notifications            | 1:N   | Usuário recebe N notificações            |
| users ↔ messages                 | N:M   | Usuários trocam mensagens                |
| students ↔ instructors(favorites)| N:M   | Alunos favoritam instrutores             |

---

## 🔑 Índices Críticos para Performance

### Queries Mais Frequentes:

1. **Buscar instrutores por localização:**
   ```sql
   CREATE INDEX idx_users_location ON users(latitude, longitude);
   ```

2. **Listar aulas de um instrutor por data:**
   ```sql
   CREATE INDEX idx_lessons_date_instructor ON lessons(scheduled_date, instructor_id);
   ```

3. **Buscar disponibilidade de instrutor:**
   ```sql
   CREATE INDEX idx_availability_instructor_date 
   ON instructor_availability(instructor_id, date);
   ```

4. **Listar instrutores por avaliação:**
   ```sql
   CREATE INDEX idx_instructors_rating ON instructors(average_rating DESC);
   ```

5. **Buscar mensagens não lidas:**
   ```sql
   CREATE INDEX idx_messages_unread ON messages(recipient_id, is_read);
   ```

---

## 🎯 Queries Exemplo

### 1. Buscar instrutores próximos com filtros

```sql
SELECT 
  u.full_name,
  i.price_per_hour,
  i.average_rating,
  i.total_reviews,
  ARRAY_AGG(c.code) as categories,
  ST_Distance(
    ST_MakePoint(u.longitude, u.latitude)::geography,
    ST_MakePoint(-46.6333, -23.5505)::geography -- São Paulo
  ) / 1000 as distance_km
FROM instructors i
JOIN users u ON i.user_id = u.id
LEFT JOIN instructor_categories ic ON i.id = ic.instructor_id
LEFT JOIN categories c ON ic.category_id = c.id
WHERE i.is_verified = true
  AND i.is_accepting_students = true
  AND ST_DWithin(
    ST_MakePoint(u.longitude, u.latitude)::geography,
    ST_MakePoint(-46.6333, -23.5505)::geography,
    20000 -- 20km
  )
GROUP BY u.id, i.id
ORDER BY i.average_rating DESC, distance_km ASC
LIMIT 20;
```

### 2. Verificar disponibilidade de instrutor

```sql
SELECT date, start_time, end_time
FROM instructor_availability
WHERE instructor_id = 'uuid-do-instrutor'
  AND date >= CURRENT_DATE
  AND date <= CURRENT_DATE + INTERVAL '7 days'
  AND is_available = true
ORDER BY date, start_time;
```

### 3. Dashboard do instrutor (estatísticas)

```sql
SELECT 
  COUNT(*) FILTER (WHERE l.scheduled_date = CURRENT_DATE) as lessons_today,
  COUNT(*) FILTER (WHERE DATE_TRUNC('month', l.scheduled_date) = DATE_TRUNC('month', CURRENT_DATE)) as lessons_this_month,
  COUNT(DISTINCT l.student_id) as active_students,
  SUM(p.instructor_amount) FILTER (WHERE p.status = 'paid' AND DATE_TRUNC('month', p.paid_at) = DATE_TRUNC('month', CURRENT_DATE)) as revenue_this_month,
  AVG(r.rating) as current_rating
FROM instructors i
LEFT JOIN lessons l ON i.id = l.instructor_id
LEFT JOIN payments p ON l.id = p.lesson_id
LEFT JOIN reviews r ON l.id = r.lesson_id
WHERE i.id = 'uuid-do-instrutor'
GROUP BY i.id;
```

---

## 📦 Stack Recomendada

### Backend:
- **Node.js 20+** + TypeScript
- **Framework:** NestJS (enterprise) ou Express (simples)
- **ORM:** Prisma
- **Validação:** Zod
- **Auth:** JWT + Passport

### Banco de Dados:
- **PostgreSQL 15+** (principal)
- **Redis** (cache, filas, sessões)
- **PostGIS** (geolocalização)

### Infraestrutura:
- **API:** Railway/Render/AWS
- **DB:** Supabase/Railway/AWS RDS
- **Storage:** AWS S3/Cloudinary
- **Pagamentos:** Stripe/Mercado Pago

---

Quer que eu crie:
1. ✅ Schema completo Prisma?
2. ✅ Migrations SQL?
3. ✅ DTOs TypeScript?
4. ✅ API endpoints REST?
