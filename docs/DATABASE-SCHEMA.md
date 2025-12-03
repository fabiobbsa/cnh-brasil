# 🗄️ Modelo de Banco de Dados - Auto-Rota

## Arquitetura Recomendada

- **Banco:** PostgreSQL 14+ (relacional, robusto para produção)
- **ORM:** Prisma ou TypeORM (TypeScript-first)
- **Cache:** Redis (sessões, filas de pagamento)
- **Storage:** AWS S3 ou Cloudinary (fotos, documentos)

---

## 📊 Diagrama de Relacionamentos

```
users (1) ──────< instructors (1)
  │                     │
  │                     ├──< instructor_credentials (1:1)
  │                     ├──< instructor_availability (1:N)
  │                     ├──< instructor_categories (N:M via junction)
  │                     └──< lessons (1:N)
  │                            │
  └──────────────────< lessons (N:1)
                              │
                              ├──< payments (1:1)
                              ├──< reviews (1:1)
                              └──< renach_records (1:1)
```

---

## 📋 Tabelas Detalhadas

### 1. **users** (Usuários do Sistema)
Tabela base para autenticação (alunos e instrutores)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Dados Básicos
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  
  -- Perfil
  full_name VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  date_of_birth DATE NOT NULL,
  avatar_url TEXT,
  
  -- Tipo de usuário
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'instructor', 'admin')),
  
  -- Status
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  is_blocked BOOLEAN DEFAULT FALSE,
  
  -- Endereço
  address_street VARCHAR(255),
  address_number VARCHAR(20),
  address_complement VARCHAR(100),
  address_neighborhood VARCHAR(100),
  address_city VARCHAR(100),
  address_state VARCHAR(2),
  address_zipcode VARCHAR(9),
  
  -- Geolocalização
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,
  deleted_at TIMESTAMP -- Soft delete
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_cpf ON users(cpf);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_location ON users(latitude, longitude);
```

---

### 2. **instructors** (Perfil do Instrutor)
Dados específicos de instrutores

```sql
CREATE TABLE instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  
  -- Dados Profissionais
  professional_name VARCHAR(255), -- Nome exibido na plataforma
  bio TEXT, -- Descrição/apresentação
  experience_years INTEGER NOT NULL,
  
  -- Precificação
  price_per_hour DECIMAL(10, 2) NOT NULL,
  accepts_payment_methods JSON DEFAULT '["pix", "credit_card", "debit_card"]',
  
  -- Disponibilidade Geral
  working_days JSON DEFAULT '["monday","tuesday","wednesday","thursday","friday","saturday"]',
  working_hours_start TIME DEFAULT '08:00:00',
  working_hours_end TIME DEFAULT '18:00:00',
  
  -- Estatísticas
  total_lessons_given INTEGER DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  average_rating DECIMAL(3, 2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  
  -- Verificação
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP,
  
  -- Status
  is_accepting_students BOOLEAN DEFAULT TRUE,
  is_available BOOLEAN DEFAULT TRUE,
  
  -- Preferências
  max_distance_km INTEGER DEFAULT 20, -- Raio de atendimento
  preferred_student_age_min INTEGER,
  preferred_student_age_max INTEGER,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_instructors_user_id ON instructors(user_id);
CREATE INDEX idx_instructors_rating ON instructors(average_rating DESC);
CREATE INDEX idx_instructors_price ON instructors(price_per_hour);
CREATE INDEX idx_instructors_verified ON instructors(is_verified);
```

---

### 3. **instructor_credentials** (Credenciais Detran)
Documentação e credenciamento oficial

```sql
CREATE TABLE instructor_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID NOT NULL UNIQUE REFERENCES instructors(id) ON DELETE CASCADE,
  
  -- CNH
  cnh_number VARCHAR(20) UNIQUE NOT NULL,
  cnh_category VARCHAR(10) NOT NULL, -- AB, ACC, etc
  cnh_expiry_date DATE NOT NULL,
  cnh_document_url TEXT, -- Scan da CNH
  cnh_verified BOOLEAN DEFAULT FALSE,
  
  -- Credencial Detran
  detran_credential_number VARCHAR(50) UNIQUE NOT NULL,
  detran_credential_expiry DATE NOT NULL,
  detran_credential_document_url TEXT,
  detran_verified BOOLEAN DEFAULT FALSE,
  
  -- Curso de Formação
  formation_course_certificate VARCHAR(100),
  formation_course_date DATE,
  formation_course_institution VARCHAR(255),
  formation_course_document_url TEXT,
  
  -- Certidões
  criminal_record_clear BOOLEAN DEFAULT FALSE,
  criminal_record_date DATE,
  criminal_record_document_url TEXT,
  
  -- Status Geral
  credentials_status VARCHAR(20) DEFAULT 'pending' CHECK (
    credentials_status IN ('pending', 'under_review', 'approved', 'rejected', 'expired')
  ),
  
  -- Observações
  admin_notes TEXT,
  rejection_reason TEXT,
  
  -- Timestamps
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP,
  approved_at TIMESTAMP,
  expires_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_credentials_instructor ON instructor_credentials(instructor_id);
CREATE INDEX idx_credentials_status ON instructor_credentials(credentials_status);
CREATE INDEX idx_credentials_expiry ON instructor_credentials(detran_credential_expiry);
```

---

### 4. **categories** (Categorias CNH)
Categorias de habilitação disponíveis

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(5) UNIQUE NOT NULL, -- A, B, C, D, E, AB, ACC
  name VARCHAR(100) NOT NULL,
  description TEXT,
  vehicle_type VARCHAR(50), -- moto, carro, caminhão, ônibus
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dados iniciais
INSERT INTO categories (code, name, vehicle_type) VALUES
('A', 'Categoria A - Motocicletas', 'moto'),
('B', 'Categoria B - Automóveis', 'carro'),
('AB', 'Categoria AB - Motos e Carros', 'ambos'),
('C', 'Categoria C - Veículos de Carga', 'caminhão'),
('D', 'Categoria D - Transporte de Passageiros', 'ônibus'),
('E', 'Categoria E - Veículos Articulados', 'articulado'),
('ACC', 'ACC - Autorização para Conduzir Ciclomotor', 'ciclomotor');
```

---

### 5. **instructor_categories** (Relação N:M)
Categorias que cada instrutor está habilitado a ensinar

```sql
CREATE TABLE instructor_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT FALSE, -- Categoria principal do instrutor
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(instructor_id, category_id)
);

CREATE INDEX idx_instructor_categories_instructor ON instructor_categories(instructor_id);
CREATE INDEX idx_instructor_categories_category ON instructor_categories(category_id);
```

---

### 6. **instructor_availability** (Agenda do Instrutor)
Disponibilidade detalhada por data/hora

```sql
CREATE TABLE instructor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  
  -- Data e Hora
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  
  -- Status
  is_available BOOLEAN DEFAULT TRUE,
  is_blocked BOOLEAN DEFAULT FALSE, -- Bloqueado manualmente
  
  -- Tipo de bloqueio
  block_reason VARCHAR(100), -- férias, doença, manutenção veículo, etc
  
  -- Recorrência (opcional)
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern VARCHAR(20), -- daily, weekly, monthly
  recurrence_end_date DATE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(instructor_id, date, start_time)
);

CREATE INDEX idx_availability_instructor_date ON instructor_availability(instructor_id, date);
CREATE INDEX idx_availability_date_range ON instructor_availability(date, start_time, end_time);
```

---

### 7. **lessons** (Aulas Agendadas)
Tabela central - registra todas as aulas

```sql
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relacionamentos
  instructor_id UUID NOT NULL REFERENCES instructors(id),
  student_id UUID NOT NULL REFERENCES users(id),
  category_id UUID NOT NULL REFERENCES categories(id),
  
  -- Agendamento
  scheduled_date DATE NOT NULL,
  scheduled_start_time TIME NOT NULL,
  scheduled_end_time TIME NOT NULL,
  duration_hours DECIMAL(3, 2) NOT NULL, -- Ex: 2.00, 1.50
  
  -- Local
  pickup_location VARCHAR(255) NOT NULL,
  pickup_latitude DECIMAL(10, 8),
  pickup_longitude DECIMAL(11, 8),
  
  -- Status da Aula
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (
    status IN (
      'pending',        -- Aguardando confirmação
      'confirmed',      -- Confirmada
      'in_progress',    -- Em andamento
      'completed',      -- Concluída
      'cancelled',      -- Cancelada
      'no_show'         -- Aluno não compareceu
    )
  ),
  
  -- Valores
  price_agreed DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) DEFAULT 0.00,
  instructor_earning DECIMAL(10, 2),
  
  -- Aula Realizada
  actual_start_time TIMESTAMP,
  actual_end_time TIMESTAMP,
  actual_duration_hours DECIMAL(3, 2),
  
  -- Notas do Instrutor
  instructor_notes TEXT,
  student_progress_notes TEXT,
  skills_practiced JSON, -- ["baliza", "paralela", "trânsito urbano"]
  
  -- Cancelamento
  cancelled_by UUID REFERENCES users(id), -- Quem cancelou
  cancelled_at TIMESTAMP,
  cancellation_reason TEXT,
  cancellation_fee DECIMAL(10, 2) DEFAULT 0.00,
  
  -- Integração Renach
  renach_registered BOOLEAN DEFAULT FALSE,
  renach_registration_date TIMESTAMP,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_lessons_instructor ON lessons(instructor_id);
CREATE INDEX idx_lessons_student ON lessons(student_id);
CREATE INDEX idx_lessons_date ON lessons(scheduled_date);
CREATE INDEX idx_lessons_status ON lessons(status);
CREATE INDEX idx_lessons_date_instructor ON lessons(scheduled_date, instructor_id);
```

---

### 8. **payments** (Pagamentos)
Controle financeiro de cada aula

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL UNIQUE REFERENCES lessons(id) ON DELETE CASCADE,
  
  -- Valores
  amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  instructor_amount DECIMAL(10, 2) NOT NULL,
  
  -- Método de Pagamento
  payment_method VARCHAR(20) NOT NULL CHECK (
    payment_method IN ('pix', 'credit_card', 'debit_card', 'bank_transfer')
  ),
  
  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'processing', 'paid', 'failed', 'refunded', 'cancelled')
  ),
  
  -- Gateway de Pagamento
  gateway VARCHAR(20), -- stripe, mercadopago, pagseguro
  gateway_transaction_id VARCHAR(255),
  gateway_response JSON,
  
  -- PIX
  pix_qr_code TEXT,
  pix_qr_code_url TEXT,
  pix_copy_paste TEXT,
  
  -- Datas
  paid_at TIMESTAMP,
  refunded_at TIMESTAMP,
  expires_at TIMESTAMP,
  
  -- Transferência para Instrutor
  transferred_to_instructor BOOLEAN DEFAULT FALSE,
  transfer_date TIMESTAMP,
  transfer_transaction_id VARCHAR(255),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_lesson ON payments(lesson_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_gateway ON payments(gateway_transaction_id);
```

---

### 9. **reviews** (Avaliações)
Avaliações de alunos sobre instrutores

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL UNIQUE REFERENCES lessons(id) ON DELETE CASCADE,
  instructor_id UUID NOT NULL REFERENCES instructors(id),
  student_id UUID NOT NULL REFERENCES users(id),
  
  -- Avaliação
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  -- Aspectos Específicos (1-5)
  punctuality_rating INTEGER CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
  teaching_quality_rating INTEGER CHECK (teaching_quality_rating >= 1 AND teaching_quality_rating <= 5),
  patience_rating INTEGER CHECK (patience_rating >= 1 AND patience_rating <= 5),
  vehicle_condition_rating INTEGER CHECK (vehicle_condition_rating >= 1 AND vehicle_condition_rating <= 5),
  
  -- Controle
  is_public BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT TRUE, -- Apenas quem teve aula pode avaliar
  is_flagged BOOLEAN DEFAULT FALSE, -- Conteúdo inapropriado
  flagged_reason TEXT,
  
  -- Resposta do Instrutor
  instructor_response TEXT,
  instructor_responded_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_instructor ON reviews(instructor_id);
CREATE INDEX idx_reviews_student ON reviews(student_id);
CREATE INDEX idx_reviews_rating ON reviews(rating DESC);
CREATE INDEX idx_reviews_public ON reviews(is_public, instructor_id);
```

---

### 10. **renach_records** (Registro Renach)
Integração oficial com sistema Detran/Renach

```sql
CREATE TABLE renach_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL UNIQUE REFERENCES lessons(id) ON DELETE CASCADE,
  instructor_id UUID NOT NULL REFERENCES instructors(id),
  student_id UUID NOT NULL REFERENCES users(id),
  
  -- Dados Renach
  renach_protocol VARCHAR(100) UNIQUE,
  renach_status VARCHAR(20) CHECK (
    renach_status IN ('pending', 'sent', 'registered', 'rejected', 'error')
  ),
  
  -- Dados Enviados
  student_cpf VARCHAR(14) NOT NULL,
  student_renach_number VARCHAR(20),
  lesson_date DATE NOT NULL,
  lesson_duration DECIMAL(3, 2) NOT NULL,
  category_code VARCHAR(5) NOT NULL,
  
  -- Resposta Renach
  renach_response JSON,
  renach_error_message TEXT,
  
  -- Tentativas
  attempts INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMP,
  max_attempts INTEGER DEFAULT 3,
  
  -- Timestamps
  sent_at TIMESTAMP,
  registered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_renach_lesson ON renach_records(lesson_id);
CREATE INDEX idx_renach_status ON renach_records(renach_status);
CREATE INDEX idx_renach_protocol ON renach_records(renach_protocol);
```

---

### 11. **notifications** (Notificações)
Sistema de notificações push, email e SMS

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Conteúdo
  type VARCHAR(50) NOT NULL, -- lesson_confirmed, payment_received, review_received
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  
  -- Link de ação
  action_url VARCHAR(500),
  action_label VARCHAR(50),
  
  -- Canal
  channel VARCHAR(20) NOT NULL CHECK (channel IN ('push', 'email', 'sms', 'in_app')),
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  
  -- Envio
  sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP,
  delivery_status VARCHAR(20), -- delivered, failed, bounced
  
  -- Dados Extras
  metadata JSON,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_type ON notifications(type);
```

---

### 12. **messages** (Chat/Mensagens)
Sistema de mensagens entre aluno e instrutor

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relacionamento
  sender_id UUID NOT NULL REFERENCES users(id),
  recipient_id UUID NOT NULL REFERENCES users(id),
  lesson_id UUID REFERENCES lessons(id), -- Contexto da conversa
  
  -- Mensagem
  content TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text' CHECK (
    message_type IN ('text', 'image', 'audio', 'location', 'system')
  ),
  
  -- Arquivo (se aplicável)
  attachment_url TEXT,
  attachment_type VARCHAR(50),
  attachment_size INTEGER,
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  is_deleted_by_sender BOOLEAN DEFAULT FALSE,
  is_deleted_by_recipient BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id);
CREATE INDEX idx_messages_conversation ON messages(sender_id, recipient_id, created_at DESC);
CREATE INDEX idx_messages_unread ON messages(recipient_id, is_read);
```

---

### 13. **favorites** (Instrutores Favoritos)
Alunos podem favoritar instrutores

```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(student_id, instructor_id)
);

CREATE INDEX idx_favorites_student ON favorites(student_id);
CREATE INDEX idx_favorites_instructor ON favorites(instructor_id);
```

---

### 14. **admin_logs** (Logs de Auditoria)
Registro de ações administrativas

```sql
CREATE TABLE admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID NOT NULL REFERENCES users(id),
  
  -- Ação
  action VARCHAR(100) NOT NULL, -- approve_instructor, block_user, refund_payment
  entity_type VARCHAR(50) NOT NULL, -- user, instructor, lesson, payment
  entity_id UUID NOT NULL,
  
  -- Detalhes
  description TEXT,
  old_value JSON,
  new_value JSON,
  
  -- Context
  ip_address VARCHAR(45),
  user_agent TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_admin_logs_admin ON admin_logs(admin_user_id);
CREATE INDEX idx_admin_logs_entity ON admin_logs(entity_type, entity_id);
CREATE INDEX idx_admin_logs_date ON admin_logs(created_at DESC);
```

---

## 🔐 Views Úteis

### View: Instrutores Disponíveis (para busca)

```sql
CREATE OR REPLACE VIEW v_available_instructors AS
SELECT 
  i.id,
  u.full_name,
  u.avatar_url,
  i.professional_name,
  i.bio,
  i.price_per_hour,
  i.experience_years,
  i.average_rating,
  i.total_reviews,
  i.is_verified,
  i.is_accepting_students,
  u.address_city,
  u.address_state,
  u.latitude,
  u.longitude,
  ARRAY_AGG(DISTINCT c.code) as categories,
  (
    SELECT ia.start_time 
    FROM instructor_availability ia 
    WHERE ia.instructor_id = i.id 
      AND ia.date >= CURRENT_DATE 
      AND ia.is_available = TRUE 
    ORDER BY ia.date, ia.start_time 
    LIMIT 1
  ) as next_available_time
FROM instructors i
JOIN users u ON i.user_id = u.id
LEFT JOIN instructor_categories ic ON i.id = ic.instructor_id
LEFT JOIN categories c ON ic.category_id = c.id
WHERE u.is_active = TRUE 
  AND i.is_available = TRUE
  AND i.is_accepting_students = TRUE
GROUP BY i.id, u.full_name, u.avatar_url, i.professional_name;
```

---

## 🚀 Próximos Passos

1. **Escolher ORM:** Prisma (recomendado) ou TypeORM
2. **Criar migrations:** Estrutura incremental
3. **Seeds:** Dados iniciais (categorias, admin)
4. **API REST:** CRUD para cada entidade
5. **Autenticação:** JWT + refresh tokens
6. **Testes:** Unit tests para models

---

## 📦 Exemplo Prisma Schema

Quer que eu crie o arquivo `schema.prisma` completo com todas essas tabelas?
