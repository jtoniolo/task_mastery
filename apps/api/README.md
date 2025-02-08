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
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# TaskMastery API

## Description
The TaskMastery API is built with NestJS and provides the backend services for task management, authentication, and integration with external services.

## Local Development Setup

### Prerequisites
- Node.js (v18 or later)
- yarn (v1.22 or later)
- Docker

### Installation and Setup

1. Install dependencies:
```bash
yarn
```

2. Configure MongoDB:
- Ensure MongoDB container is running (see root README for Docker setup)
- Default connection URI: mongodb://admin:password@localhost:27017/task_mastery
- If you need to start MongoDB separately:
```bash
docker run -d \
  --name task-mastery-mongodb \
  --network task-mastery-network \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:7.0
```
- Verify MongoDB connection using the health check endpoint:
```bash
curl http://localhost:3000/api/health/readiness
```
- Expected response if MongoDB is connected:
```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  }
}
```

3. Set up environment variables:
- Copy and configure .env file as described in the root README
- Required for local development:
  - MONGODB_URI
  - GOOGLE_CLIENT_ID
  - GOOGLE_CLIENT_SECRET
  - JWT_SECRET
  - SESSION_SECRET

### Development Server

```bash
# Start in development mode with hot-reload
yarn start:dev

# Start in debug mode
yarn start:debug

# Build and start in production mode
yarn build
yarn start:prod
```

### Testing

```bash
# Unit tests with watch mode
yarn test:watch

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## API Documentation
- Swagger UI available at `/api` when the server is running
- OpenAPI specification available at `/api-json`

## Authentication
The API uses JWT-based authentication with Google OAuth2 integration. See [auth.flow.md](src/auth/auth.flow.md) for detailed authentication flow.

## Key Features
- Google OAuth2 Integration
- JWT Authentication
- Health Checks (`/health`)
- Email Processing
- Task Management
- User Management

## Project Structure
- `/src`
  - `/auth` - Authentication and authorization
  - `/config` - Configuration services
  - `/dashboard` - Dashboard-related endpoints
  - `/gmail` - Gmail integration
  - `/health` - Health check endpoints
  - `/processors` - Email and task processors
  - `/users` - User management

## Testing
Tests are written using Jest. Each module includes:
- Unit tests (`*.spec.ts`)
- E2E tests (in `/test` directory)

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

## Deployment

For deployment instructions, including Docker builds, refer to the root project's deployment documentation.
