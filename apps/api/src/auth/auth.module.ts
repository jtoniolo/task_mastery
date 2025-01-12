import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { User } from '../users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { QueueModule } from 'queue/queue.module';
import { QUEUE_NEW_USER } from 'queue/queue.constants';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google', session: true }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h', audience: 'http://localhost:4200' },
      }),
      inject: [ConfigService],
    }),
    QueueModule.register({
      queues: [QUEUE_NEW_USER],
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    JwtService,
    Logger,
  ],
  exports: [AuthService],
})
export class AuthModule {}
