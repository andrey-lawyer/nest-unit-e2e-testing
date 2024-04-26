## Nest-unit-e2e-testing

- [Introduction](#introduction)
- [Features](#features)
- [Running](#running)
- [Schema](#schema)
- [Testing](#testing)

## Introduction

It is a simple application built with Nest.js, featuring database integration and user authentication. The primary focus of this project is to demonstrate best practices for testing in Nest.js, including unit tests and end-to-end (E2E) tests.

The application showcases how to effectively test various components, services, controllers, and endpoints within a Nest.js application. It provides examples of setting up and running tests using Jest and Supertest, ensuring the reliability and correctness of the application's functionality across different layers.

## Features

- **Testing:** The project includes an extensive suite of tests, including unit tests, integration tests, and end-to-end (E2E) tests, to ensure the reliability and proper functioning of the application.

- **Databases:** PostgreSQL are used, with the help of the TypeORM library for interacting with them.

- **Authentication:** The project includes an authentication mechanism using the Passport library to ensure user login security.

## Running

1. **Clone the repo**

```bash
github.com/andrey-lawyer/nest-unit-e2e-testing
```

2. **Install dependencies** It's recommended to use npm:

```bash
npm install
```

3. **Start Docker Containers:** If you're using Docker, run docker-compose up to start containers with databases and other services.

```bash
docker-compose up -d
```

4. **Running**

```bash
npm run start:dev
```

## Schema

The database schema includes tables for User and Post. Relationships between these tables allow you to organise posts between different users.

## Testing

The project includes two test scripts:

1. **Unit Tests:** Execute Jest to run unit tests. Run the command npm run test to run these tests.

```bash
npm run test
```

2. **End-to-End (E2E) Tests:** These tests are specifically for end-to-end testing and are configured to run with Jest using the environment variable NODE_ENV=test. Execute the command npm run test:e2e to run these tests with the Jest configuration provided in ./test/jest-e2e.json.

```bash
npm run test:e2e
```
