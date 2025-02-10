
# TaskMastery API

## Description

The TaskMastery API is built with NestJS and provides the backend services for task management, authentication, and integration with external services.

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

- Swagger UI available at `/api/docs` when the server is running
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

## Tests

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
