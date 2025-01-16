import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GmailModule } from 'gmail/gmail.module';
import { Message } from 'gmail/entities/message.entity';
import { User } from 'users/entities/user.entity';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [GmailModule, TypeOrmModule.forFeature([User, Message])],
  providers: [DashboardService, Logger],
  controllers: [DashboardController],
})
export class DashboardModule {}
