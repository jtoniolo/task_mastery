# email_sweeperr

## Project Description

The project aims to build an open-source alternative to Clean.Email, with additional tools for organizing and cleaning out inboxes. My personal inbox is in sore need of some tidying up!

## Purpose

I'm writing this app to familiarize myself with NestJS and v19 of Angular. One of the reasons I've picked TypeScript/Node for the API is lower development overhead, given the small scope of this project. I'm already familiar with Angular and prefer its more OOPy approach.

## Scope

The scope of the project is to build a tool for cleaning out Gmail inboxes. The project will be a contribution to the self-hosted community. The app will include various filters and groupings to find and action emails (archive, delete, label, auto-unsubscribe). These will include older than; between dates; group by sender; group by sender domain; group by label. We will include a subject preview for groupings to allow for "surgical" cleaning instead of just bulk cleaning. The project will also include a module for organizing and cleaning labels (merge, delete, add, etc...)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- yarn (v1.22 or later)
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/jtoniolo/email_sweeperr.git
   cd email_sweeperr
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

3. Set up environment variables:
   ```sh
   cp src/.env.example src/.env
   ```

4. Update the `.env` file with your configuration.

### Running the Application

1. Start the development server:
   ```sh
   yarn start:dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Stack

- **Backend**: NestJS, TypeScript, Node.js
- **Frontend**: Angular v19
- **Database**: MongoDB

## Logging Configuration and Usage

For detailed information on logging configuration and usage, please refer to the [LOGGING.md](LOGGING.md) file.

## Health Checks

Health checks are implemented in the API using the `@nestjs/terminus` package. The health checks cover key endpoints and services, including database connections and third-party service dependencies. A designated monitoring endpoint `/health` is configured in the API to return the status of all health checks.

### How to Use and Interpret Health Check Results

1. **Access the Health Check Endpoint**:
   - Open your browser and navigate to `http://localhost:3000/health`.
   - You will see a JSON response indicating the status of various health checks.

2. **Interpret the Results**:
   - The JSON response will contain the status of each health check. For example:
     ```json
     {
       "status": "ok",
       "info": {
         "database": {
           "status": "up"
         }
       },
       "error": {},
       "details": {
         "database": {
           "status": "up"
         }
       }
     }
     ```
   - The `status` field indicates the overall health status of the API.
   - The `info` field contains the status of individual health checks that are healthy.
   - The `error` field contains the status of individual health checks that are unhealthy.
   - The `details` field provides detailed information about each health check.

3. **Monitor the Health Status**:
   - Regularly check the `/health` endpoint to monitor the health status of the API.
   - Set up automated monitoring and alerting based on the health check results to proactively address any issues.

By following these steps, you can effectively use and interpret the health check results to monitor the health and performance of the system proactively.
