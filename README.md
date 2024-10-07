## Installation

```bash
# npm CLI
$ npm install --legacy-peer-deps
```

## Task 1: Set up Prisma

```bash
# prisma CLI
npm install prisma --save-dev --legacy-peer-deps

# initialize the Prisma schema
npx prisma init

# @prisma/client package
npm install @prisma/client --legacy-peer-deps
```

## Task 2: Add Prisma model and run first migration

```bash
# first database migration
npx prisma migrate dev --name <name>
```

## Task 3: Seed database

```bash
# seed.ts
npm run prisma:seed

```

## Task 4: Running the app

```bash
$ npm run start
```

## Task 5: Test

```bash

# e2e tests
$ npm run test:e2e -- bookmark.service.e2e-spec.ts
```
