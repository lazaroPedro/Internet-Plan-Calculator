# Desafio Técnico Micks: Calculadora de Planos de Internet

![Status](https://img.shields.io/badge/status-concluído-brightgreen)

##  Visão Geral

Este projeto é a solução completa para o **Desafio Técnico - Calculadora de Plano de Internet**. O objetivo foi criar uma aplicação full-stack (Frontend + Backend) que resolve o problema de recomendação e contratação de planos de internet de uma operadora.

A aplicação automatiza o cálculo do plano ideal com base nos dispositivos do cliente, agiliza o processo de venda e fornece um painel administrativo para o gerenciamento das contratações.

A solução foi projetada seguindo as melhores práticas de arquitetura e desenvolvimento, com foco em um código limpo, escalável e uma excelente experiência de usuário.



## Funcionalidades Principais

* ✅ **Calculadora de Planos:** Um formulário interativo onde o usuário insere a quantidade de dispositivos (celulares, computadores, etc.).
* ✅ **Cálculo de Peso Dinâmico:** A API calcula o peso total dos dispositivos em tempo real, aplicando os pesos definidos para cada um.
* ✅ **Sugestão de Plano Automatizada:** Com base no peso total, o sistema sugere o plano ideal (Prata, Bronze, Ouro, Diamante) com a respectiva velocidade. 
* ✅ **Fluxo de Contratação:** Formulário para o cliente inserir dados pessoais (nome, e-mail, telefone) e contratar o plano sugerido.
* ✅ **Registro de Vendas:** A API de contratação persiste todos os dados da venda em um banco de dados PostgreSQL.
* ✅ **Notificações por E-mail:** Envio de e-mails assíncronos e com templates HTML personalizados após a contratação:
    * Um e-mail de confirmação para o **cliente** com o resumo detalhado do seu novo plano.
    * Um e-mail de notificação para o **vendedor** (`operacoes@micks.com.br`) com os dados da nova venda.
* ✅ **Painel Administrativo (`/vendas`):**
    * Acesso protegido por autenticação (usuário `admin`, senha `desafio`) com Token JWT.
    * Listagem completa de todas as vendas registradas no banco de dados.
    * Exibição detalhada dos dados de cada venda (cliente, contato, dispositivos, plano, etc.).
    * Funcionalidade de filtragem de vendas por nome do cliente e por data.

* ✅ **Upload de Vendas em Lote:** No painel administrativo, foi implementada a funcionalidade de fazer upload de um arquivo `.xlsx` para registrar múltiplas vendas de uma só vez.

## 🛠️ Tecnologias Utilizadas

* **Backend:** Java 21, Spring Boot 3, Spring Security (JWT), Spring Data JPA, JavaMailSender, Thymeleaf (para os templates de e-mail).
* **Frontend:** React 18+, TypeScript, Vite, Tailwind CSS, Axios, React Router DOM.
* **Banco de Dados:** PostgreSQL.
* **Ambiente:** Docker & Docker Compose.

## 🚀 Como Rodar o Projeto

O projeto é 100% containerizado com Docker, garantindo que ele rode de forma idêntica em qualquer ambiente.

#### Pré-requisitos
* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)

### Passos para a Instalação

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/lazaroPedro/Internet-Plan-Calculator
    cd Internet-Plan-Calculator
    ```

2.  **Configure as Variáveis de Ambiente:**
    O projeto utiliza um arquivo `.env` para gerenciar senhas e segredos. Basta copiar o arquivo de exemplo na raiz do projeto `.exemple.env`.
    ```bash
    mv .env.example .env
    ```


### Guia Rápido: Gerando uma Senha de App no Gmail

A funcionalidade de envio de e-mails utiliza o servidor do Gmail, entretanto pode se utilizar qualquer email.

Por segurança, o Google não permite que aplicações se conectem com sua senha principal se a "Verificação em duas etapas" estiver ativa. É necessário gerar uma senha exclusiva para esta aplicação.

#### Passo 1: Ativar a Verificação em Duas Etapas

A "Senha de App" só está disponível para contas com a Verificação em Duas Etapas ativa.

Acesse a página de segurança da sua Conta Google:

https://myaccount.google.com/security


#### Passo 2: Gerar a Senha de App

Na página de segurança e acesse o link para "Senhas de App":

https://myaccount.google.com/apppasswords



Na tela de "Senhas de app", configure da seguinte forma:

- Em "Selecionar o app", escolha "Outro (nome personalizado)".

- Dê um nome para a senha, por exemplo: API Micks.

- Clique no botão "GERAR".

- Copie a senha de 16 letras (sem os espaços)

#### Passo 3: Usar a Senha Gerada



Cole essa senha no seu arquivo .env, no campo `MAIL_PASSWORD`

No campo `MAIL_USER`, coloque o seu endereço de e-mail do Gmail completo.

Exemplo final no arquivo .env:
```bash
    DB_NAME=internet-plan
    DB_USER=usuario
    DB_PASSWORD=senha
    JWT_SECRET=02438bbb098f070133df807d230fa5de6f03789a5b499fb60931cb4f20719f85
    MAIL_USER=usuario@gmail.com
    MAIL_PASSWORD=senhade16digitos
 ```

3.  **Inicie os Containers:**
    Este comando irá construir as imagens e iniciar todos os serviços (backend, frontend e banco de dados).
    ```bash
    docker-compose up --build
    ```

4.  **Pronto!**
    Aguarde alguns instantes para os serviços iniciarem. A aplicação estará pronta para uso.

## 🔗 Acesso


* **Frontend:** [http://localhost:3001/](http://localhost:3001/) 
* **Backend (API Rest):** [http://localhost:3000](http://localhost:3000) 

---
* **Credenciais de Acesso ao Sistema:** 
    * **Usuário:** `admin`
    * **Senha:** `desafio`


## 📂 Estrutura de Pastas

``` bash
.
├── backend/                # Aplicação Spring Boot (API REST)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/lazaropedro/api_internet_plan/
│   │   │   │   ├── config/        # Configurações gerais e de segurança
│   │   │   │   ├── controller/    # Controllers (endpoints da API)
│   │   │   │   ├── dto/           # Objetos de transferência de dados
│   │   │   │   ├── model/         # Entidades e modelos de domínio
│   │   │   │   ├── repository/    # Interfaces de acesso ao banco
│   │   │   │   └── service/       # Regras de negócio
│   │   │   └── resources/
│   │   │       └── templates/     # Templates Thymeleaf para o email
│   └── pom.xml                    # Configuração Maven
│
└── frontend/              # Aplicação React + TypeScript
├── public/            # Arquivos públicos (index.html, ícones, etc.)
├── src/               # Código-fonte React
│   ├── components/    # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── types/         # Tipos customizados
├── package.json       # Dependências e scripts
└── tsconfig.json      # Configuração TypeScript
```
