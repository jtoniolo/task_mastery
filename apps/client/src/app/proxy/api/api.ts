export * from './app.service';
import { AppService } from './app.service';
export * from './auth.service';
import { AuthService } from './auth.service';
export * from './health.service';
import { HealthService } from './health.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [AppService, AuthService, HealthService, UsersService];
