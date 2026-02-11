# 🔙 KCALMA - Backend

Backend da aplicação **KCALMA**, responsável pelo gerenciamento de usuários, refeições, metas calóricas, cálculos nutricionais, autenticação e integração com IA.

Desenvolvido com **Java + Spring Boot**, seguindo boas práticas de organização, segurança e integração contínua.

---

## 🛠️ Tecnologias Utilizadas

- Java 17
- Spring Boot  
- Spring Data JPA  
- Spring Security  
- JWT  
- MySQL  
- Maven  

---

## 📦 Pré-requisitos

Antes de rodar o projeto, instale:

- ☕ Java 17
- 📦 Maven 3.9+  
- 🐘 MySQL  
- 🔧 Git  

Verifique as versões:

```bash
java -version
mvn -version
```

---

## ⚙️ Configuração das Variáveis de Ambiente

O projeto **não utiliza arquivo `.env`**.  
As configurações são feitas via **variáveis de ambiente do sistema operacional**.

---

### 🔐 Variáveis Obrigatórias

```bash
DB_URL=
DB_USERNAME=
DB_PASSWORD=

JWT_SECRET=sua_chave_super_secreta
```

---

## 🖥️ Como Definir Variáveis de Ambiente

### ✅ Windows (PowerShell como Administrador)

```powershell
setx DB_URL "###"
setx DB_USERNAME "###"
setx DB_PASSWORD "###"
setx JWT_SECRET "###"
```

Depois feche e reabra o terminal.

---

### ✅ Linux / VPS

Adicione no `.bashrc` ou `.profile`:

```bash
export DB_URL=###
export DB_USERNAME=###
export DB_PASSWORD=###
export JWT_SECRET=###
```

Depois execute:

```bash
source ~/.bashrc
```

---

## 🗄️ Configuração do Banco de Dados

Crie o banco no MySQL:

```sql
CREATE DATABASE kcalma;
```

As tabelas serão criadas automaticamente se estiver configurado:

```properties
spring.jpa.hibernate.ddl-auto=update
```

---

## ▶️ Como Rodar o Projeto

### 1️⃣ Instalar dependências

```bash
mvn clean install
```

---

### 2️⃣ Rodar a aplicação

```bash
mvn spring-boot:run
```

ou

```bash
java -jar target/kcalma-backend.jar
```

---

## 🌍 Acessando a API

Após iniciar:

```
http://localhost:8080
```

---

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Token)**.

Fluxo:

1. Usuário realiza login  
2. Recebe um token JWT  
3. Envia o token nas requisições protegidas:

```
Authorization: Bearer SEU_TOKEN
```

---

## 🗂️ Estrutura do Projeto

```
src/main/java
 ├── controllers
 ├── domain
 ├── dto
 ├── exceptions
 ├── infra
 │   ├── cors
 │   ├── exception
 │   └── security
 ├── repositories
 └── services
```

---