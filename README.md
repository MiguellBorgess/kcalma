# 🥗 KCALMA

Bem-vindo ao README do **KCALMA**, um aplicativo de acompanhamento alimentar focado em **contagem de calorias**, **visualização de dados** e **apoio inteligente com IA**, desenvolvido por estudantes de Sistemas de Informação da **UFU** para a disciplina **Processo e Desenvolvimento de Sistemas**.

---

## 📌 Visão Geral do Projeto

O KCALMA tem como objetivo ajudar usuários a:

* Registrar refeições diárias de forma simples
* Calcular automaticamente calorias consumidas
* Acompanhar histórico alimentar
* Visualizar evolução ao longo do tempo
* Comparar consumo real com metas definidas

O sistema prioriza **praticidade**, **clareza visual** e **baixo esforço de uso**.

---

## 🧠 Funcionalidades Principais

### 🔢 Calculadora de Calorias (Funcionalidade Central)

O usuário pode registrar uma refeição de duas formas:

#### 1. Registro com foto

* O usuário tira uma foto do prato
* A IA identifica **quais alimentos estão presentes**
* O sistema **não define quantidades**
* O usuário informa manualmente a quantidade consumida

#### 2. Registro manual

* Seleção direta do alimento
* Definição de quantidade e unidade
* Definição do tipo de refeição

Em ambos os casos, o sistema:

* Calcula o total de calorias
* Armazena a refeição com data, tipo e imagem (se houver)

---

### 📅 Calendário Alimentar

Permite visualizar o histórico diário:

* Refeições registradas por dia
* Total de calorias consumidas
* Média diária
* Comparação com a meta calórica

---

### 📊 Dashboard de Evolução

Painel visual com dados consolidados:

* Evolução do consumo calórico
* Comparação consumo × meta
* Análise por período (dias, semanas, meses)
* Distribuição por tipo de refeição

---

### 👤 Perfil do Usuário

O usuário pode cadastrar:

* Nome e foto
* Peso
* Altura

Com base nesses dados, o sistema calcula o **IMC (Índice de Massa Corporal)**.

---

### 🎯 Metas Calóricas

* Definição de meta diária
* Utilizada no calendário e dashboard
* Permite verificar se o objetivo foi atingido

---

## 🔄 Fluxo de Desenvolvimento

1. Criar uma branch `feature/*`
2. Desenvolver a funcionalidade
3. Push em `feature/*` gera automaticamente PR para `develop`
4. Push em `develop` gera automaticamente  PR para `homolog`
5. Push em `homolog` gera automaticamente  PR para produção (`main`)

---

## 🧷 Proteções e Qualidade

Branches protegidas:

* `main`
* `homolog`
* `develop`

Regras aplicadas:

* Pull Request obrigatório
* Bloqueio de force push
* Histórico preservado

---

## ✍️ Padrão de Commits

Formato:

```
[TIPO] - descrição curta
```

Tipos utilizados:

* `[ADD]` nova funcionalidade
* `[FIX]` correção de bug
* `[UPD]` melhoria
* `[CFG]` configuração
* `[DEL]` remoção

---

## 🧠 Justificativa Final

> O KCALMA adota um processo de desenvolvimento baseado em integração contínua e criação automatizada de releases, garantindo organização, rastreabilidade e qualidade mesmo em um contexto acadêmico com restrições de tempo.