# 🚀 E2E Treinamentos - E2E Burguer - BACKEND


## 👨‍💻 O que você vai encontrar nesse repositório

Neste repositório, você encontrará a aplicação **Backend E2E BURGUER**, usada nos desafios práticos em nossos treinamentos de Automação e Testes de software.

## :hammer_and_wrench: Tecnologias Utilizadas

- [Node.js](https://nodejs.org/en/) - Plataforma de desenvolvimento.

- [TypeScript](https://www.typescriptlang.org/) - Plataforma de desenvolvimento.

- [React](https://react.dev/) - Plataforma de desenvolvimento.

- [Express](https://expressjs.com/) - Express é um framework web para Node.js que simplifica o processo de criação de APIs (Application Programming Interfaces).

- [Prisma](https://www.prisma.io/) - Conjunto de ferramentas de desenvolvimento de banco de dados que oferece um ORM (Object-Relational Mapping) para Node.js e TypeScript.

- [Axios](https://axios-http.com/ptbr/docs/intro) -Cliente HTTP baseado-em-promessas para o node.js e para o navegador
   
## 🚀 Como executar o projeto
Essas instruções permitiração que você obtenha uma cópia do projeto  sua máquina local.

### Fork do projeto
 - Para execução do projeto, cria uma pasta e faça o Fork do projeto;
 - Após o fork realize o clone do projeto do seu GitHub para o repositório local.

    
### 🤖 Execute o comando abaixo para instalar das dependências do projeto:
 - Para usar o **yarn** no projeto, habilitar via prompet como administrador:
 ```
corepack enable
```

- Instalar as dependências na pasta do projeto backend:
```
npm install
```
ou
```
yarn install
```

## ℹ️ Configurar BD Relacional

Essas instruções permitiração que você configure um banco de dados local para a execução do projeto  sua máquina.

- Fazer o download e instalação do **postgressSQL** de acordo com seu sistema operacional [postgresql](https://www.postgresql.org/download/) - anotar sua senha cadastrada.
- Após baixar o postgresSQL criar um Database com o nome **e2efood-db**


 Na pasta do projeto backend executar via terminal os comandos abaixo para instalar as dependências do Prisma no projeto.
 
```
npm install prisma --save-dev
npm install @prisma/client
```
ou 
```
yarn add prisma
yarn add @prisma/client 
```
- [Prisma Database relacional](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql) - Documentação.
####  No arquivo `.env` no projeto alterar as configurações do seu banco de dados local:
- Substituir `suasenha` pela senha do seu pgAdmin
`DATABASE_URL="postgresql://postgres:suasenha@localhost:5432/e2efood-db?schema=public"`

- Gerar um JWT-SECRET através: [md5hashgenerator](https://www.md5hashgenerator.com/)
- Substituir `suasenha` pelo hash gerado.
`JWT_SECRET=suasenha"`

- Criar o migration ao executar o comando via terminal na pasta do projeto:
 ``
 - npx prisma migrate dev //criar as tabelas no banco
 - yarn prisma  migrate dev
``
  

### ⚙️ Para executar a aplicação:
Para execução da aplicação  na pasta do projeto através de um terminal de sua preferência e utilize o comando:

```
yarn dev
```
### 📚 Documentação Swagger

Com a aplicação backend online acessar o swagger através: [Swagger BugE2E](http://localhost:3333/api-swagger/#/Product/getcategory_product)

# 📌 Notas Gerais
 
**#BoraEstudar!**

Conheça **nossos Treinamentos** [E2E Treinamentos](https://e2etreinamentos.com.br/)  

⌨️ **Perfis da Escola:**
 - [LinkedIn](https://www.linkedin.com/company/e2e-treinamentos/)
   
 - [Instagram](https://www.instagram.com/e2etreinamentos/)
   
 - [Facebook](https://www.facebook.com/E2ETreinamento/?locale=pt_BR)
  
Feito com ❤️ por [Aline Areda](https://github.com/AlineAreda)
- [LinkedIn](https://www.linkedin.com/in/aline-areda/) 😊

