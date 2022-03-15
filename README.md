# Payment Subscription service

## Technical stack

- Technical programming:
  - TypeScript: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
  - Node.js: [https://nodejs.org/en/](https://nodejs.org/en/)
  - Prisma: [https://www.prisma.io/](https://www.prisma.io/)
  - Postgres: [https://www.postgresql.org/](https://www.postgresql.org/)
  - NestJS: [https://nestjs.com/](https://nestjs.com/)docker.com/)
  - Stripe: [https://stripe.com/docs](https://stripe.com/docs) (see Billing especially)
- Technical operation:
  - *Containerize*: all application containerize with **Docker**

## .env
- Please update the .evn before you start the project
- If you are running on local mode you need to install postgres by your self

```bash
API_KEY=123456
PORT=3000
#For localhost please enable it
DATABASE_URL="postgresql://postgres:1234@localhost:5432/payment-subscription?schema=public"
#For docker please enable it
#DATABASE_URL="postgresql://postgres:1234@postgres:5432/payment-subscription?schema=public"

STRIPE_SECRET_KEY=sk_test_51IVs34APi7Q2DJnFZCeBoYDpNd9qgGCsKnBz2aeOH82okhxmWFc4BrkonUzbdPv8hXiwhCdneeH6xrzpTV5pGACB00l3dSyUZl
STRIPE_CURRENCY=usd
STRIPE_PLAN_A_API_ID=price_1KbuadAPi7Q2DJnFKC8s7huk
STRIPE_PLAN_B_API_ID=price_1KbudiAPi7Q2DJnFYfCdZHkE
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run with Docker
Please enable DATABASE_URL for Docker in .env file

```bash
docker-compose up -d
```

