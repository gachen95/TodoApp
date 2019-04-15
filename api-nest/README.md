
# Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# API server -  GraphQL server

## 1. Installation

```bash
$ cd api
$ npm install
```

## 2. Install the Prisma CLI

To run the example, you need the Prisma CLI. Please install it via NPM or [using another method](https://www.prisma.io/docs/prisma-cli-and-configuration/using-the-prisma-cli-alx4/#installation):

```
npm install -g prisma
```

## 3. Set up database & deploy Prisma datamodel

Prisma datamodel is **prisma/datamodel.graphql**  
Prisma configuration file is **prisma/prisma.yml**

For this example, you'll use a free _demo database_ (AWS Aurora) hosted in Prisma Cloud. To set up your database, run:

```
prisma deploy
```

Then, follow these steps in the interactive CLI wizard:

1. Select **Demo server**
1. **Authenticate** with Prisma Cloud in your browser (if necessary)
1. Back in your terminal, **confirm all suggested values**



### prisma command

```bash
# login to prisma
$ prisma login

# deploy prisma database
$ prisma deploy

# generate prisma
$ prisma generate

# see .graphqlconfig.yml
$ prisma playground
```

<details>
 <summary>Alternative: Run Prisma locally via Docker</summary>

1. Ensure you have Docker installed on your machine. If not, you can get it from [here](https://store.docker.com/search?offering=community&type=edition).
1. Create `docker-compose.yml` for MySQL (see [here](https://www.prisma.io/docs/prisma-server/database-connector-POSTGRES-jgfr/) for Postgres):
    ```yml
    version: '3'
    services:
      prisma:
        image: prismagraphql/prisma:1.29
        restart: always
        ports:
        - "4466:4466"
        environment:
          PRISMA_CONFIG: |
            port: 4466
            databases:
              default:
                connector: mysql
                host: mysql
                port: 3306
                user: root
                password: prisma
                migrations: true
      mysql:
        image: mysql:5.7
        restart: always
        environment:
          MYSQL_ROOT_PASSWORD: prisma
        volumes:
          - mysql:/var/lib/mysql
    volumes:
      mysql:
    ```
1. Run `docker-compose up -d`
1. Set the `endpoint` in `prisma.yml` to `http://localhost:4466`
1. Run `prisma deploy`

</details>

You can now use [Prisma Admin](https://www.prisma.io/docs/prisma-admin/overview-el3e/) to view and edit your data by appending `/_admin` to your Prisma endpoint.

## Running the API server -  GraphQL server

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
-------------------------------

## test

```
mutation {
  signup(email: "gachen@gmail.com", password:"test", username:"gachen") {
    token
    user{
      id
      email
      username
      password
    }
  }
}

mutation {
  signup(
    email: "gachen@gmail.com"
    password:"test"
    username:"gachen"
  )
  {
    token
    user{
      id
      email
      username
      password
    }
  }
}

mutation {
  login (email: "admin@example.com", password: "admin") {
    token
    user {
      id
      username
    }
  }
}

query {
  users {
    id
    displayName
  }
}

mutation {
  updateMe(displayName: "administrator"){
    id
    displayName
  }
}

From the server’s response, copy the authentication token and open another tab in the Playground. Inside that new tab, open the HTTP HEADERS pane in the bottom-left corner and specify the Authorization header - similar to what you did with the Prisma Playground before. Replace the __TOKEN__ placeholder in the following snippet with the copied token:

{
  "Authorization": "Bearer __TOKEN__"
}

```

## Reference
1. [nestjs-prisma-client-starter](https://github.com/fivethree-team/nestjs-prisma-client-starter)
2. [server-nestjs](https://github.com/awesome-graphql-space/server-nestjs)
3. [prisma examples](https://github.com/prisma/prisma-examples/tree/master/typescript/graphql-auth)
4. [awesome graphql](https://github.com/chentsulin/awesome-graphql)

# UI
