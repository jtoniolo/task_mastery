import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'auth/auth.module';
import { queueConfig } from 'config/queue.config';
import { GmailModule } from 'gmail/gmail.module';
import { Message } from 'gmail/entities/message.entity';
import { HealthModule } from 'health/health.module';
import { ThrottlerBehindProxyGuard } from 'middleware/throttler-behind-proxy.guard';
import { QueueModule } from 'queue/queue.module';
import { UserModule } from 'users/user.module';
import { User } from 'users/entities/user.entity';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProcessorsModule } from './processors/processors.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { Label } from 'gmail/entities/label.entity';

@Module({
  imports: [
    HealthModule,
    AuthModule,
    UserModule,
    DashboardModule,
    queueConfig,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local', '.env.dev', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB_URI'),
        database: configService.get<string>('MONGODB_DB_NAME'),
        entities: [User, Message, Label],
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
    GmailModule,
    QueueModule,
    ProcessorsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    Logger,
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class AppModule {}
