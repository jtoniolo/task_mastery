import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService extends NestConfigService {
  constructor(internalConfig?: Record<string, any>) {
    super(internalConfig);
  }

  get clientUrl(): string {
    return this.get<string>('CLIENT_URL');
  }

  get corsOrigins(): string {
    return this.get<string>('CORS_ORIGINS');
  }

  get gmailBatchSize(): number {
    return this.get<number>('GMAIL_BATCH_SIZE');
  }

  get googleCallbackUrl(): string {
    return this.get<string>('GOOGLE_CALLBACK_URL');
  }

  get googleClientId(): string {
    return this.get<string>('GOOGLE_CLIENT_ID');
  }

  get googleClientSecret(): string {
    return this.get<string>('GOOGLE_CLIENT_SECRET');
  }

  get jwtSecret(): string {
    return this.get<string>('JWT_SECRET');
  }
  get jwtIssuer(): string {
    return this.get<string>('JWT_ISSUER');
  }

  get lokiBasicAuth(): string {
    return this.get<string>('LOKI_BASIC_AUTH');
  }

  get lokiHost(): string {
    return this.get<string>('LOKI_HOST');
  }

  get mongodbDbName(): string {
    return this.get<string>('MONGODB_DB_NAME');
  }

  get mongodbUri(): string {
    return this.get<string>('MONGODB_URI');
  }

  get nodeEnv(): string {
    return this.get<string>('NODE_ENV');
  }

  get sessionSecret(): string {
    return this.get<string>('SESSION_SECRET');
  }
}
