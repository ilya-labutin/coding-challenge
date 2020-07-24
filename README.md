![coding-challenge-ci Actions Status](https://github.com/ilya-labutin/coding-challenge/workflows/coding-challenge-ci/badge.svg)

# coding-challenge

<!-- TOC depthFrom:2 -->

- [Overview](#overview)
- [Run locally](#run-locally)
- [Static checks](#static-checks)
- [Components tests](#components-tests)
- [End to end tests](#end-to-end-tests)
- [Vercel deployment](#vercel-deployment)

<!-- /TOC -->

## Overview

Problem description is here: https://github.com/morkro/coding-challenge

Tech stack is: [`Next.js`](https://nextjs.org) with [`SWR`](https://swr.vercel.app/), and MongoDB.

## Run locally

In order to run locally execute `docker-compose` command:

```bash
docker-compose up --build -d
```

Open your browser and navigate to http://localhost:8181

### Restart with fresh database

By default the database is re-provisioned with every app container restart (convenient for development)

```bash
docker-compose restart app
```

## Static checks

Project is configured with [`Prettier`](https://prettier.io) formatter and [`ESLint`](https://eslint.org/) linter. Both Prettier and ESLint are parts of the CI/CD implemented via [`GitHub Actions`](https://docs.github.com/en/actions).

In order to check and fix code formatting locally install dependencies via `npm install` and execute the following:

```bash
npm run prettier:check
npm run prettier:fix
```

In order to run ESLint locally execute:

```bash
npm run lint:eslint
```

## Components tests

React components are covered with [`React Testing Library`](https://testing-library.com/docs/react-testing-library/intro) tests. These tests are also part of the CI/CD.

In order to run tests locally make sure that you have dependencies installed (`npm install`) and execute:

```bash
npm run test
```

In order to generate test coverage report execute:

```bash
npm run test:coverage
```

## End to end tests

End to end tests covers main application use case: blocking and resolving spam reports, navigating throught the spam reports. Tests are implemented via all-in-one testing framework [`Cypress`](https://www.cypress.io/) and are executed in a headless Chrome as a part of CI/CD.

In order to run tests locally install the Cypress library (it is not a part of project dependencies):

```bash
npm install cypress --no-save
```

And then run the following npm script (it builds application containers, starts them via docker-compose and launches cypress scripts in Chrome):

```bash
npm run cypress
```

## Vercel deployment

Configured CI/CD deploys application to the [`Vercel`](https://vercel.com/) cloud platform. It is a native cloud platform for the Next.js applications.

Deployment link is the following: `https://coding-challenge.vercel.app/`

Vercel deployment uses [`MongoDB Atlas`](https://www.mongodb.com/cloud/atlas) cloud service. In order to reset database state in the Vercel deployment execute:

```bash
npm run provision:prod
```
