# Pact Provider-Consumer Contract Test

---

## EN - English

This project demonstrates **Pact contract testing** between a provider and a consumer in TypeScript.

### Structure

- **provider/** — Express API with a `/users` route (GET `/users`, GET `/users/:id`)
- **consumer/** — `UserClient` class that consumes the provider's users endpoints
- **pacts/** — generated Pact contract files

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

### Provider routes

| Method | Route         | Description         |
|--------|---------------|---------------------|
| GET    | `/users`      | List all users      |
| GET    | `/users/:id`  | Get user by ID      |

---

## PT-BR - Português

Este projeto demonstra **testes de contrato Pact** entre um provider e um consumer em TypeScript.

### Estrutura

- **provider/** — API Express com rota `/users` (GET `/users`, GET `/users/:id`)
- **consumer/** — Classe `UserClient` que consome os endpoints de usuários do provider
- **pacts/** — arquivos de contrato Pact gerados

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

### Rotas do provider

| Método | Rota          | Descrição            |
|--------|---------------|----------------------|
| GET    | `/users`      | Listar todos os usuários |
| GET    | `/users/:id`  | Buscar usuário por ID |