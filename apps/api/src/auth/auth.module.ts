import { Logger, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'users/entities/user.entity';
import { UserService } from 'users/user.service';
import { ConfigModule as MyConfigModule } from 'config/config.module';
import { QueueModule } from 'queue/queue.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google', session: true }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
          audience: configService.get<string>('CLIENT_URL'),
        },
      }),
      inject: [ConfigService],
    }),
    MyConfigModule,
    QueueModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    AuthService,
    ConfigService,
    GoogleStrategy,
    JwtStrategy,
    JwtService,
    Logger,
    UserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
