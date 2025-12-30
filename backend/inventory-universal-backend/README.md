<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Environment variables

Create a `.env` in the project root or set the following in your environment:

- DB_PASSWORD - MongoDB connection password (or connection string fragment)
- PORT - optional server port (default 3000)
- S3_BUCKET, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY - optional if using S3 for file uploads

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migrations / Data migration

A migration script is provided to move vendor items stored per user to the new global vendor-items store:

```bash
# build the project then run
$ npm run build
$ DB_PASSWORD=yourpass node scripts/migrate_vendor_items_to_global.js
```

## Seeds

A seed script is provided to create a super admin and sample vendors. The script requires a build (`dist`) to be present because it imports compiled models:

```bash
# set environment variables (optional)
# DB_PASSWORD - required for DB connection
# SEED_SUPER_EMAIL - optional super admin email (default super@mysockhq.test)
# SEED_SUPER_PASSWORD - optional super admin password (default SuperSecret123)

$ npm run seed
```

The seed will:
- create a `super` user if one does not exist
- create sample vendors (`vendor-001`, `vendor-002`) and corresponding vendor items containers

Note: after seeding, you can sign in via the existing OTP flow to complete account creation or use the seeded password if you provided `SEED_SUPER_PASSWORD` and want to use `/auth/login` (the current login requires a created account).

## Admin endpoints (high level)

- GET /orders/admin/pending/:requestorEmail - list pending orders (superadmin only)
- POST /orders/admin/approve/:requestorEmail - approve and set charges for an order (body: { orderId, vendorCharge, customerCharge })
- GET /vendors/public - public vendor listing (limited fields)
- POST /vendors/create/:requestorEmail - create vendor (superadmin only)
- PATCH /vendors/:vendorId/:requestorEmail - update vendor (superadmin only)
- GET /vendor-items/:vendorId - list items for a vendor
- POST /vendor-items/:vendorId/:requestorEmail - add item to vendor (vendor or superadmin)
- PATCH /vendor-items/:vendorId/:itemId/:requestorEmail - update item price (vendor or superadmin)
- POST /complaints/file/:reporterEmail - file complaint about a vendor

## Notes

- Current authorization uses `requestorEmail` path params to determine role and ownership (existing pattern). For production, switch to JWT auth and Nest guards.
- Item and vendor images are expected to be URLs (upload handler to be added). If using S3, set the S3 env vars and add an upload endpoint to store files.

## Troubleshooting / dev tips

- To inspect pending orders, use Postman calling the admin endpoints as a user with `designation: 'super'`.
- To migrate vendor items: ensure `dist` build exists (run `npm run build`) then execute the migration script described above.


## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
