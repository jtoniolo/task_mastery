# Authorization Logic

## Overview
This document provides an overview of the authorization logic implemented in the NestJS API. The authorization mechanism ensures that users can only access their own entity records and no one else's.

## AuthorizationGuard
The `AuthorizationGuard` is a custom guard that restricts access to user-specific records. It checks if the user has access to the requested resource and logs unauthorized access attempts.

### Implementation
The `AuthorizationGuard` is implemented in the `src/apps/api/src/auth/authorization.guard.ts` file. It uses the `CanActivate` interface and the `Reflector` and `UserRepository` to perform authorization checks.

### Configuration
To configure the `AuthorizationGuard`, follow these steps:

1. Import the `AuthorizationGuard` in the `AppModule`:
   ```typescript
   import { AuthorizationGuard } from '../auth/authorization.guard';
   ```

2. Add the `AuthorizationGuard` to the `APP_GUARD` providers in the `AppModule`:
   ```typescript
   providers: [
     {
       provide: APP_GUARD,
       useClass: AuthorizationGuard,
     },
   ],
   ```

### Usage
To use the `AuthorizationGuard`, apply it to the desired routes or controllers. For example:
```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../auth/authorization.guard';

@Controller('resource')
export class ResourceController {
  @Get(':id')
  @UseGuards(AuthorizationGuard)
  getResource() {
    // Logic to get the resource
  }
}
```

## Logging Unauthorized Access Attempts
The `AuthorizationGuard` logs unauthorized access attempts using the `Logger` class. Unauthorized access attempts are logged with a warning message, including the user ID and the resource ID.

## Conclusion
The `AuthorizationGuard` ensures that users can only access their own entity records and logs unauthorized access attempts. By following the configuration and usage steps, you can implement and use the `AuthorizationGuard` in your NestJS API.
