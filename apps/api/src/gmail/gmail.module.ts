import { BullModule } from '@nestjs/bullmq';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GoogleOauthService } from 'auth/google-oauth.service';
import { QUEUE_NEW_MESSAGES, QUEUE_NEW_USER } from 'queue/queue.constants';
import { User } from 'users/entities/user.entity';
import { UserService } from 'users/user.service';

import { Message } from './entities/message.entity';
import { GmailController } from './gmail.controller';
import { GmailService } from './gmail.service';
import { QueueService } from 'queue/queue.service';

//TODO: Remove Queue realted code after testing

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NEW_USER,
    }),
    BullModule.registerQueue({
      name: QUEUE_NEW_MESSAGES,
    }),
    TypeOrmModule.forFeature([User, Message]),
  ],
  providers: [
    GmailService,
    Logger,
    GoogleOauthService,
    UserService,
    QueueService,
  ],
  exports: [],
  controllers: [GmailController],
})
export class GmailModule {}
