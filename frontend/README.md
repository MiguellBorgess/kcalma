# 🎨 KCALMA - Frontend

Frontend da aplicação **KCALMA**, responsável pela interface do usuário, registro de refeições, visualização de dados, dashboard e interação com a API do backend.

Desenvolvido com **React + TypeScript**, priorizando organização, componentização e experiência do usuário.

---

## 🛠️ Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Axios
- React Router DOM
- Context API
- CSS / Tailwind

---

## 📦 Pré-requisitos

Antes de rodar o projeto, instale:

- Node.js 18+
- npm ou yarn
- Git

Verifique as versões:

```bash
node -v
npm -v
```

---

## ⚙️ Configuração das Variáveis de Ambiente

O projeto utiliza variáveis de ambiente através do padrão do Vite.

Crie um arquivo na raiz do projeto:

```
.env
```

---

### 🔐 Variáveis Obrigatórias

```env
VITE_API_URL=http://localhost:8080
```

Essa variável define a URL base do backend.

---

## ▶️ Como Rodar o Projeto

### 1️⃣ Instalar dependências

```bash
npm install
```

ou

```bash
yarn
```

---

### 2️⃣ Rodar em modo desenvolvimento

```bash
npm run dev
```

ou

```bash
yarn dev
```

O projeto ficará disponível em:

```
http://localhost:5173
```

---

## 🌐 Comunicação com Backend

O frontend se comunica com o backend via Axios utilizando a variável:

```
VITE_API_URL
```

Exemplo de uso:

```ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
```

---

## 🔐 Autenticação

A aplicação utiliza autenticação via **JWT**.

Fluxo:

1. Usuário faz login
2. Recebe token do backend
3. Token é armazenado (localStorage ou Context)
4. Enviado nas requisições:

```
Authorization: Bearer TOKEN
```

---

## 📂 Estrutura do Projeto

```
src/
 ├── components
 ├── pages
 ├── routes
 ├── services
 ├── contexts
 ├── hooks
 ├── interfaces
 ├── assets
 └── App.tsx
```