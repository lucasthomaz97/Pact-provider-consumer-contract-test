# Pact Provider-Consumer Contract Test

## Menu
- [EN - English](#en---english)
- [PT-BR - Português](#pt-br---português)

---

## EN - English

This project demonstrates **Pact contract testing** between a provider and a consumer in TypeScript.

### Structure

- **provider/** — Express API with `/users` routes
  - `src/routes/users.ts` — route handlers
  - `src/repository/UserRepository.ts` — in-memory data layer
- **consumer/** — `UserClient` class that consumes the provider's users endpoints
- **pacts/** — generated Pact contract files
- **consumer/tests/**, **provider/tests/** — contract tests

### How it works

1. The **consumer** defines expectations and generates a Pact file
2. The **provider** is verified against the generated Pact file
3. If both match, the contract is valid

### Commands

```bash
# Install dependencies
npm install

# Start provider API (Express on port 4000)
npx ts-node provider/src/index.ts

# Run consumer tests (generates pact file)
npm run test:consumer

# Run provider verification (validates against pact file)
npm run test:provider

# Run both
npm run test
```

### GitHub Actions

The project includes a CI workflow (`.github/workflows/contract_tests.yml`) that runs on push and pull requests to `main`:

- Sets up Node.js 22 with npm caching
- Installs dependencies with `npm ci`
- Runs consumer tests to generate Pact files
- Runs provider verification against the generated Pact files

### Provider routes

| Method | Route         | Description                              |
|--------|---------------|------------------------------------------|
| GET    | `/users`      | List all users                           |
| GET    | `/users/:id`  | Get user by ID                           |
| POST   | `/users`      | Create user (validates email, uniqueness) |

---

## PT-BR - Português

Este projeto demonstra **testes de contrato Pact** entre um provider e um consumer em TypeScript.

### Estrutura

- **provider/** — API Express com rotas `/users`
  - `src/routes/users.ts` — handlers das rotas
  - `src/repository/UserRepository.ts` — camada de dados em memória
- **consumer/** — Classe `UserClient` que consome os endpoints de usuários do provider
- **pacts/** — arquivos de contrato Pact gerados
- **consumer/tests/**, **provider/tests/** — testes de contrato

### Funcionamento

1. O **consumer** define expectativas e gera um arquivo Pact
2. O **provider** é verificado contra o arquivo Pact gerado
3. Se ambos forem compatíveis, o contrato é válido

### Comandos

```bash
# Instalar dependências
npm install

# Iniciar API provider (Express na porta 4000)
npx ts-node provider/src/index.ts

# Executar testes do consumer (gera o arquivo pact)
npm run test:consumer

# Executar verificação do provider (valida contra o pact)
npm run test:provider

# Executar ambos
npm run test
```

### GitHub Actions

O projeto inclui um workflow de CI (`.github/workflows/contract_tests.yml`) que roda em push e pull requests para `main`:

- Configura Node.js 22 com cache do npm
- Instala dependências com `npm ci`
- Executa testes do consumer para gerar arquivos Pact
- Executa verificação do provider contra os arquivos Pact gerados

### Rotas do provider

| Método | Rota          | Descrição                              |
|--------|---------------|----------------------------------------|
| GET    | `/users`      | Listar todos os usuários               |
| GET    | `/users/:id`  | Buscar usuário por ID                  |
| POST   | `/users`      | Criar usuário (valida email, unicidade) |