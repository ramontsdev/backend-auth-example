# 🔐 Backend Auth Example API

Uma API completa de autenticação desenvolvida com Node.js, Express, TypeScript e Prisma, seguindo os princípios de Clean Architecture.

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [API Endpoints](#-api-endpoints)
- [Testando a API](#-testando-a-api)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Docker](#-docker)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Contribuição](#-contribuição)

## ✨ Funcionalidades

- **🔐 Autenticação Completa**

  - Cadastro de usuários com validação
  - Login com JWT
  - Verificação de email
  - Recuperação de senha
  - Middleware de autenticação

- **👤 Gerenciamento de Usuários**

  - Criação de usuários
  - Busca por ID, email ou documento
  - Atualização de dados
  - Perfil do usuário autenticado

- **📧 Sistema de Email**

  - Envio de emails de boas-vindas
  - Códigos de verificação
  - Recuperação de senha
  - Integração com AWS SES

- **🛡️ Segurança**
  - Senhas criptografadas com bcrypt
  - Tokens JWT seguros
  - Validação de dados com Zod
  - CORS configurado

## 🛠️ Tecnologias

- **Backend**: Node.js, Express.js, TypeScript
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Autenticação**: JWT (JSON Web Tokens)
- **Criptografia**: bcryptjs
- **Validação**: Zod
- **Email**: AWS SES
- **Desenvolvimento**: ESLint, tsx, tsconfig-paths
- **Gerenciador de Pacotes**: pnpm

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** com as seguintes camadas:

```
src/
├── domain/           # Regras de negócio e entidades
├── data/            # Casos de uso e protocolos
├── infra/           # Implementações concretas (Prisma)
├── main/            # Configurações e adaptadores
└── presentation/    # Controllers, middlewares e validações
```

## 📋 Pré-requisitos

- Node.js (versão 22.17.1 ou superior)
- pnpm (versão 10.12.3 ou superior)
- PostgreSQL
- Conta AWS (para envio de emails)

## 🚀 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/ramontsdev/backend-auth-example.git
cd backend-auth-example
```

2. **Instale as dependências**

```bash
pnpm install
```

3. **Configure o banco de dados**

```bash
# Crie um banco PostgreSQL chamado 'auth_example_db'
createdb auth_example_db
```

4. **Execute as migrações**

```bash
pnpm prisma:migrate
```

5. **Gere o cliente Prisma**

```bash
pnpm prisma:generate
```

## ⚙️ Configuração

1. **Copie o arquivo de exemplo**

```bash
cp .env.example .env
```

2. **Configure as variáveis de ambiente** (veja seção [Variáveis de Ambiente](#-variáveis-de-ambiente))

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

```bash
pnpm dev
```

### Produção

```bash
pnpm build
pnpm start
```

### Docker

```bash
pnpm docker:up
```

O servidor estará rodando em `http://localhost:4500`

## 📡 API Endpoints

### 🔒 Autenticação

| Método | Endpoint                        | Descrição                      | Autenticação |
| ------ | ------------------------------- | ------------------------------ | ------------ |
| POST   | `/api/sign-up`                  | Cadastrar novo usuário         | ❌           |
| POST   | `/api/sign-in`                  | Fazer login                    | ❌           |
| POST   | `/api/confirm-email`            | Confirmar email                | ❌           |
| POST   | `/api/forgot-password`          | Solicitar recuperação de senha | ❌           |
| POST   | `/api/reset-password`           | Redefinir senha                | ❌           |
| POST   | `/api/resend-verification-code` | Reenviar código de verificação | ❌           |

### 👤 Usuários

| Método | Endpoint  | Descrição               | Autenticação |
| ------ | --------- | ----------------------- | ------------ |
| GET    | `/api/me` | Dados do usuário logado | ✅           |

### 🏥 Sistema

| Método | Endpoint  | Descrição     | Autenticação |
| ------ | --------- | ------------- | ------------ |
| GET    | `/health` | Status da API | ❌           |

## 🔐 Políticas de autenticação

- **Tokens JWT**
  - Gerados com expiração configurável via `JWT_EXPIRES_IN` (por padrão, `15m`).
  - Assinados com a chave `JWT_SECRET`.

- **Códigos de verificação**
  - Código de verificação de e-mail:
    - Tipo: `EMAIL_VERIFICATION`
    - Expira após `emailVerificationCodeExpiresInMs` (30 minutos por padrão).
  - Código de recuperação de senha:
    - Tipo: `PASSWORD_RESET`
    - Expira após `passwordResetCodeExpiresInMs` (15 minutos por padrão).

- **Política de e-mail verificado**
  - Usuários com `isEmailVerified = false` **não conseguem fazer login** (`/api/sign-in` retorna erro).

## 📦 Formato de respostas HTTP

- **Erros**:
  - Sempre retornam no formato:
    - `{ error: "mensagem de erro em PT-BR" }`
  - Exemplos:
    - `{ error: "Credenciais inválidas" }`
    - `{ error: "E-mail não verificado" }`
    - `{ error: "Código expirado" }`

- **Sucesso / respostas informativas**:
  - Mensagens simples:
    - `{ message: "mensagem em PT-BR" }`
  - Respostas com dados (por exemplo, login e `/me`):
    - Retornam diretamente o payload de dados, por exemplo:
      - `{ accessToken: "..." }`
      - `{ id, name, email, ... }`

## 🧪 Testando a API

### Postman Collection

O projeto inclui uma collection completa do Postman com:

- ✅ Todas as rotas configuradas
- ✅ Autenticação automática
- ✅ Variáveis de ambiente
- ✅ Scripts de teste

**Como usar:**

1. Importe os arquivos em `docs/postman/`
2. Configure o environment
3. Execute os testes na ordem recomendada

### Exemplo de Uso

```bash
# 1. Cadastrar usuário
curl -X POST http://localhost:4500/api/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "document": "12345678901",
    "password": "12345678"
  }'

# 2. Fazer login
curl -X POST http://localhost:4500/api/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "12345678"
  }'

# 3. Acessar dados do usuário (com token)
curl -X GET http://localhost:4500/api/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 📁 Estrutura do Projeto

```
src/
├── domain/                    # Camada de domínio
│   ├── models/               # Entidades do domínio
│   ├── usecases/            # Casos de uso
│   └── cryptography/        # Interfaces de criptografia
├── data/                     # Camada de dados
│   ├── protocols/           # Interfaces e contratos
│   └── usecases/           # Implementações dos casos de uso
├── infra/                   # Camada de infraestrutura
│   └── prisma/             # Repositórios Prisma
├── main/                    # Camada principal
│   ├── adapters/           # Adaptadores externos
│   ├── config/             # Configurações
│   ├── factories/          # Factories para injeção de dependência
│   └── routes/             # Definição das rotas
└── presentation/            # Camada de apresentação
    ├── controllers/        # Controllers HTTP
    ├── middlewares/        # Middlewares
    ├── validations/        # Schemas de validação
    └── helpers/           # Utilitários e templates
```

## 🔧 Variáveis de Ambiente

| Variável                | Descrição                 | Exemplo                                    |
| ----------------------- | ------------------------- | ------------------------------------------ |
| `PORT`                  | Porta do servidor         | `4500`                                     |
| `DATABASE_URL`          | URL do banco PostgreSQL   | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET`            | Chave secreta para JWT    | `sua-chave-secreta`                        |
| `ORIGINS_ALLOWED`       | Origens permitidas (CORS) | `http://localhost:3000`                    |
| `AWS_REGION`            | Região da AWS             | `us-east-1`                                |
| `AWS_ACCESS_KEY_ID`     | Chave de acesso AWS       | `AKIA...`                                  |
| `AWS_SECRET_ACCESS_KEY` | Chave secreta AWS         | `...`                                      |
| `APP_NAME`              | Nome da aplicação         | `Auth Example`                             |
| `APP_DOMAIN`            | Domínio da aplicação      | `example.com`                              |
| `APP_EMAIL`             | Email da aplicação        | `info@example.com`                         |
| `JWT_EXPIRES_IN`        | Expiração do access token | `15m`, `1h`                                |

## 🐳 Docker

O projeto inclui configuração Docker para desenvolvimento:

```bash
# Subir containers
pnpm docker:up

# Parar containers
pnpm docker:down
```

## 📜 Scripts Disponíveis

| Script                 | Descrição                       |
| ---------------------- | ------------------------------- |
| `pnpm dev`             | Executa em modo desenvolvimento |
| `pnpm build`           | Compila o projeto para produção |
| `pnpm start`           | Executa a versão compilada      |
| `pnpm prisma:generate` | Gera o cliente Prisma           |
| `pnpm prisma:migrate`  | Executa migrações do banco      |
| `pnpm prisma:studio`   | Abre o Prisma Studio            |
| `pnpm lint`            | Executa o linter                |
| `pnpm lint:fix`        | Corrige problemas do linter     |
| `pnpm typecheck`       | Verifica tipos TypeScript       |
| `pnpm docker:up`       | Sobe containers Docker          |
| `pnpm docker:down`     | Para containers Docker          |

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Ramon Nunes**

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
