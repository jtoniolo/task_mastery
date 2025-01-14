import { BullModule } from '@nestjs/bullmq';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GmailModule } from 'gmail/gmail.module';
import { GmailService } from 'gmail/gmail.service';
import { GoogleOauthService } from 'auth/google-oauth.service';
import { Message } from 'gmail/entities/message.entity';
import { User } from 'users/entities/user.entity';
import { UserService } from 'users/user.service';

import { NewUserConsumer } from './consumers/new-user.consumer';
import { QUEUE_NEW_MESSAGES, QUEUE_NEW_USER } from './queue.constants';
import { QueueService } from './queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NEW_USER,
    }),
    BullModule.registerQueue({
      name: QUEUE_NEW_MESSAGES,
    }),
    TypeOrmModule.forFeature([User, Message]),
    GmailModule,
  ],
  exports: [NewUserConsumer, QueueService],
  providers: [
    NewUserConsumer,
    GmailService,
    GoogleOauthService,
    Logger,
    UserService,
    QueueService,
  ],
  controllers: [],
})
export class QueueModule {}
