# TaskMastery

## Project Description

Welcome to TaskMastery, an open-source productivity assistant designed to help you effortlessly organize and manage your digital life. Our MVP focuses on creating a powerful alternative to Clean.Email, providing additional tools to declutter and organize your inbox efficiently.

## Project Purpose

I’m writing this app to familiarize myself with NestJS and v19 of Angular. One of the reasons I’ve picked TypeScript/Node for the API is lower development overhead, given the small scope of this project. I’m already familiar with Angular and prefer its more OOPy approach.

Stay tuned as we expand TaskMastery to become your ultimate productivity companion!

## MVP Features

- **Inbox Organization**: Automatically sort, label, and archive emails to keep your inbox clean and manageable.
- **Unsubscribe Management**: Easily unsubscribe from unwanted newsletters and promotions.
- **Label Management**: Streamline and customize your email labels for better organization.

### Scope of the Project

The scope of TaskMastery is to build a tool for cleaning out Gmail inboxes, aimed at contributing to the self-hosted community. The app will include various filters and groupings to find and action emails (archive, delete, label, auto-unsubscribe). These will include:

- **Older Than**: Find and action emails older than a specified date.
- **Between Dates**: Filter emails within a specific date range.
- **Group by Sender**: Organize emails by individual senders.
- **Group by Sender Domain**: Group emails from the same domain.
- **Group by Label**: Sort emails based on existing labels.

We will include a subject preview for groupings to allow for "surgical" cleaning instead of just bulk cleaning. Additionally, the project will feature a module for organizing and cleaning labels (merge, delete, add, etc.).

## Future Enhancements

Looking ahead, TaskMastery aims to integrate with various tools and platforms to further enhance personal productivity:

- **YNAB Integration**: Automate and improve financial tracking with enhanced reporting and subscription management.
- **PaperlessNgx Integration**: Automatically file attachments from your email for seamless document management.
- **Google Calendar Integration**: Smart scheduling and task management to optimize your daily routine.
- **Personal Chore Management**: Comprehensive personal task and chore management to keep your home life organized.

## Stack

- **Frontend**: Angular (v19)
- **Backend**: NestJS with TypeScript
- **Database**: MongoDB
- **Container**: Docker
- **Testing**: Jest

## Developer Getting Started

### Prerequisites

- Node.js (v18 or later)
- yarn (v1.22 or later)
- Podman (recommended) or Docker
- Git
- Gmail account (use a separate testing account for development)

### Container Environment Setup

We recommend using Podman as your container runtime due to its fully open-source nature and compatibility with Docker commands. However, Docker commands are also provided if you prefer using Docker.

#### Using Podman (Recommended)

```sh
# Pull the MongoDB image
podman pull docker.io/mongodb/mongodb-community-server:latest

# Create a pod for the application
podman pod create --name task-mastery-pod -p 27017:27017

# Run MongoDB container
podman run -d \
  --pod task-mastery-pod \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -v mongodb_data:/data/db \
  docker.io/mongodb/mongodb-community-server:latest
```

#### Using Docker

```sh
# Pull the MongoDB image
docker pull mongodb/mongodb-community-server:latest

# Create a network
docker network create task-mastery-network

# Run MongoDB container
docker run -d \
  --name mongodb \
  --network task-mastery-network \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -v mongodb_data:/data/db \
  mongodb/mongodb-community-server:latest
```

Verify the container is running:

```sh
# For Podman
podman ps

# For Docker
docker ps
```

### Local Development Setup

Clone the repository:

```sh
git clone https://github.com/jtoniolo/task_mastery.git
cd task_mastery
```

Install dependencies:

```sh
# Install root workspace dependencies
yarn
```

Set up environment variables:

```sh
cp apps/api/.env.example apps/api/.env.dev.local
```

Configure the `.env` file with your settings:
   Required variables:

- `MONGODB_URI` (default: mongodb://admin:password@localhost:27017/task_mastery)
- `GOOGLE_CLIENT_ID` - Obtain from Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - Obtain from Google Cloud Console
- `JWT_SECRET` - Generate a secure random string
- `SESSION_SECRET` - Generate a secure random string

### Running the Application

Start the API (in apps/api directory):

```sh
yarn start:dev
```

Start the client (in apps/client directory):

```sh
yarn start
```

Access the applications:

- Frontend: <http://localhost:4200>
- API: <http://localhost:3000/api>
- API Documentation: <http://localhost:3000/api/docs>

### Running Tests

- API tests: `cd apps/api && yarn test`
- Client tests: `cd apps/client && yarn test`
- E2E tests: `cd apps/api && yarn test:e2e`

## Project Structure

- `/apps/api` - NestJS backend application
- `/apps/client` - Angular frontend application
- `/deploy` - Deployment configurations

## Documentation

- [API Documentation](http://localhost:3000/api/docs) (available when API is running)
- [Logging Configuration](LOGGING.md)
- [API README](apps/api/README.md)
- [Client README](apps/client/README.md)

## Deployment

### Development Environment using Docker

Docker is used for deploying to the hosted development environment. This section is relevant for DevOps or when setting up a shared development environment.

1; Prerequisites:

- Docker
- Docker Compose

1; Build and start the containers:

```sh
cd deploy/dev
docker-compose up
```

The development environment includes:

- Frontend container (exposed on port 4200)
- Backend API container (exposed on port 3000)
- MongoDB container (internal access only)

### Production Deployment

For production deployment instructions, please refer to the [Deployment Guide](deploy/README.md).

## Health Checks

The API provides health check endpoints to monitor system status:

- `/api/health` - Overall system health including database
- `/api/health/liveness` - Application liveness check
- `/api/health/readiness` - Database connectivity check

These endpoints can be used to verify service dependencies are running correctly. For example, to check MongoDB connectivity:

```sh
curl http://localhost:3000/api/health/readiness
```

A successful response indicates all services are healthy:

```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  }
}
'''
