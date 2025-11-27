<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

Projet API poker avec Nest.js

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Resources

- La [Documentation NestJS](https://docs.nestjs.com) pour en apprendre plus sur le framework.

## Routes actives

- **GET** [/] *Route racine du projet*
  <br><br>
- **GET** [/tables] *Récupère toutes les tables*
- **GET** [/tables/:id] *Récupère une table par rapport à son id*
- **POST** [/tables/:id/join] *Permet de rejoindre une table spécifique*
- **DELETE** [/tables/leave] *Permet de quitter toute les tables*
- **GET** [/tables/:id/game/start] *Permet de lancer la partie*
- **GET** [/tables/:id/game/:action] *Permet de faire une action dans la partie*
  <br><br>
- **POST** [/auth/signup] *Permet de se créer un compte*
- **POST** [/auth/login] *Permet de récupérer un jeton JWT d'authentification*
- **GET** [/auth/profile] *Permet l'authentification finale*