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
