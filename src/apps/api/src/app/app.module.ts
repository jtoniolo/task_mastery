import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from '../auth/auth.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/entities/user.entity';
import * as winston from 'winston';
import LokiTransport from 'winston-loki';
import { HealthModule } from '../health/health.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerBehindProxyGuard } from '../guards/throttler-behind-proxy.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { Public } from '../auth/authorization.decorator';

function getTransports(): winston.transport[] {
  const list: winston.transport[] = [];

  if (process.env.LOKI_HOST) {
    list.push(
      new LokiTransport({
        host: process.env.LOKI_HOST,
        batching: true,
        basicAuth: process.env.LOKI_BASIC_AUTH
          ? process.env.LOKI_BASIC_AUTH
          : undefined,
        onConnectionError: (err) => console.error(err),
        labels: { job: 'nestjs-logs', app: 'api', env: process.env.NODE_ENV },
        json: true,
      })
    );
  }
  return list;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local'], //, '.env.dev', '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB_URI'),
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        database: configService.get<string>('MONGODB_DB_NAME'),
        entities: [User],
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        name: 'second',
        ttl: 1000,
        limit: 10,
      },
      {
        name: 'minute',
        ttl: 60000,
        limit: 100,
      },
      {
        name: 'hour',
        ttl: 1000 * 60 * 60,
        limit: 2000,
      },
    ]),
    //GmailModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule {}
