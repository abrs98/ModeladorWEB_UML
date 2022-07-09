# API for Modelador UML

<h1 align="center">
  <img src="https://cambiodigital-ol.com/wp-content/uploads/2018/11/apis.png" alt="API">
</h1>

<br/>

<div align="center">
  <img src="https://img.shields.io/badge/%F0%9F%93%85%20Last%20update%20-%20December%2012%202020-green.svg" alt="Last update: November, 2020"> <img src="https://img.shields.io/badge/ %E2%9C%94%20Updated%20For%20Version%20-%20Node%2014.0.0-brightgreen.svg" alt="Updated for Node 14.0.0">
</div>

<br/>

# `1. Quick Overview`

The idea of Hexagonal Architecture is to put inputs and outputs at the edges of our design. Business logic should not depend on whether we expose a REST or a GraphQL API, and it should not depend on where we get data from — a database, a microservice API exposed via gRPC or REST, or just a simple CSV file.

## 1.1 Features

- **sequelize**: promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server

# `2. Project Structure`

```
api-modelador-uml/
├── config/
└── src/
```
The following was ommited due to simplicity:

```
api-modelador-uml/
├── .git/ # folder that contains git files of repository
├── .vscode/ # personal vscode configuration
├── coverage/ # dir for results testing coverage
├── logs/ # dir for logs
├── node_modules/ # app dependencies
├── scripts/ # script files to configurate database, move build, setup, etc.
├── .babelrc # configuration for transpiling
├── .dockerignore # ignore docker file
├── .env # enviroment variables
├── .eslintignore # ignore eslint file
├── .eslintrc # configuration for eslint
├── .gitignore # ignore git file
├── .prettierrc # configuration for prettier
├── .sequelizerc # configuration for sequelize
├── docker-compose.yml # docker compose of solution
├── Dockerfile # docker of solution
├── jest.config.json # configuration for testing
├── package-*.json # main information of project
├── Procfile # configuration for heroku deployment
└── README.md # current file
```
Let's break the structure down to understand its hierarchy.

## 2.1 api-modelador-uml/config/

The api-modelador-uml/config/ directory contains all the configuration and enviroment
variables use this project, most part of this envs are config in .env file.

```
api-modelador-uml/
├── config/
│   ├── enviroments/
│   │   ├── developmnet.js
│   │   ├── production.js
│   │   └── test.js
│   ├── auth.js
│   ├── cors.js
│   ├── database.js
│   └── index.js
```

## 2.2 api-modelador-uml/src/

```
api-modelador-uml/
├── src/
│   ├── http/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   │   ├── database/
│   │   │   │   └── models/
│   │   │   ├── logging/
│   │   │   ├── repositories/
│   │   │   ├── sequelize/
│   │   │   │   ├── migrations/
│   │   │   │   └── seeders/
│   │   │   └── support/
│   │   └── interface/
│   │   │   ├── middlewares/
│   │   │   └── modules/
│   ├── shared/
│   │   ├── domain/
│   │   └── interface/
```

### 2.2.1 Structure of solution by components

Generic

**api-modelador-uml/src/application/**
contains get, post, put, delete, error wrapper and more of component, this use the repository.

**api-modelador-uml/src/<component_name>/domain/<domain_name>.js**
contains own data, meta data, validations and functions of component

see:
https://github.com/gcanti/tcomb/blob/master/docs/API.md

**api-modelador-uml/src/<component_name>/infrastructure/**
contains an mapper, repository and error wrapper of component

***mapper.js***

see:
https://martinfowler.com/eaaCatalog/dataMapper.html
https://www.js-data.io/docs/data-mapper-pattern

***repository.js***: contains "interfaces" of all application methods, this use the mapper and domain.

see:
https://martinfowler.com/eaaCatalog/repository.html
https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design

**api-modelador-uml/src/<component_name>/interface/module/**: contains instance, router and an entry point of component

- ***index.js***: expose to http component.
- ***instance.js***: contains all initializacion of application layer component to ready-to-use in the router.
- ***router.js***: contains all routes of your component (GET, POST, PUT, DELETE, etc.), this call application layer.

```
api-modelador-uml/
├── src/
│   ├── <component_name>/
│   │   ├── application/
│   │   |   ├── applicationError.js
│   │   |   ├── delete.js
│   │   |   ├── get.js
│   │   |   ├── index.js
│   │   |   ├── post.js
│   │   |   └── put.js
│   │   ├── domain/
│   │   |   └── <domain_name>.js
│   │   ├── infrastructure/
│   │   |   ├── mapper.js
│   │   |   ├── repository.js
│   │   |   └── repositoryError.js
│   │   └── interface/
│   │   │   ├── module/
│   │   |   |   ├── index.js
│   │   |   |   ├── instance.js # can be copy from other component, but only change repository
│   │   |   |   └── router.js <-- focus in

│   ├── http/
│   │   ├── infrastructure/
│   │   │   ├── database/
│   │   │   │   ├── models/
│   │   │   │   │   ├── <your-model-name-with-sequelize-code>.model.js
│   │   │   ├── repositories/
│   │   │   │   └── index.js
│   │   │   ├── sequelize/
│   │   │   │   └── sequelize.js
│   │   ├── interface/
│   │   │   └── router.js

│   ├── shared/
│   │   ├── interface/
│   │   │   └── create-controller.js
```

# `3. Help`

## How to create a new seed file:

Use `npx sequelize-cli seed:create --name seed-name`

## How to connect to database using terminal (linux)

If you have this error `ERROR 2026 (HY000): SSL connection error: error:1425F102:SSL routines:ssl_choose_client_version:unsupported protocol`, try this:
```
mysql -h <host> -u <user> --ssl-mode=disabled -p
```

## How to add a new component?

**http/infrastructure/repositories**

Example:
```
const ExampleRepository = require('../../../example/infrastructure/exampleRepository');
const exampleModel = database.models.get('example');
return {
  exampleRepository: new ExampleRepository({ model: exampleModel }),
};
```

**http/infrastructure/sequelize**

Example:
```
const dirs = [
  require('../../../example/infrastructure/database/models/example.model'),
];
```

**http/infrastructure/migration**

You need create a migration for new component

**http/interface/route**

Example:
```
apiRouter.use('/example/', controller('example').router);
```

**shared/interface/create-controller**

Example:
```
const controllerMap = new Map([
  ['example', require('../../example/interface/module')()],
]);
```

# `4. Learn More`
- https://github.com/goldbergyoni/nodebestpractices
- https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749
- https://github.com/santiq/bulletproof-nodejs
- https://github.com/joshuaalpuerto/node-ddd-boilerplate
- https://github.com/Sairyss/domain-driven-hexagon
- https://levelup.gitconnected.com/going-serverless-with-node-js-and-clean-architecture-a365208816ba
- https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/
- https://github.com/rolwin100/nodejs-boiler-plate-sequelize
- https://github.com/apavamontri/nodejs-clean
- https://medium.com/@alameerashraf/nodejs-a-clean-architecture-931898b00d68
- https://github.com/AlameerAshraf/NodeJS-A-Clean-Archticture-NJCA
- https://dev.to/heroku/deploying-to-heroku-from-github-actions-29ej
- https://hackernoon.com/enforcing-code-quality-for-node-js-c3b837d7ae17?ref=hackernoon.com
- https://hackernoon.com/a-tale-of-two-docker-multi-stage-build-layers-85348a409c84?ref=hackernoon.com
- https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
- https://betterprogramming.pub/docker-for-node-js-in-production-b9dc0e9e48e0
- https://dev.to/dyarleniber/setting-up-a-ci-cd-workflow-on-github-actions-for-a-react-app-with-github-pages-and-codecov-4hnp
