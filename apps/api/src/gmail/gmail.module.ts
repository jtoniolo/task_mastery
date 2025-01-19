import { BullModule } from '@nestjs/bullmq';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QUEUE_NEW_MESSAGES, QUEUE_NEW_USER } from 'queue/queue.constants';
import { QueueService } from 'queue/queue.service';
import { User } from 'users/entities/user.entity';
import { UserService } from 'users/user.service';

import { Message } from './entities/message.entity';
import { GmailController } from './gmail.controller';
import { GmailService } from './gmail.service';
import { GoogleOauthService } from './google-oauth.service';
import { Label } from './entities/label.entity';

//TODO: Remove Queue realted code after testing

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NEW_USER,
    }),
    BullModule.registerQueue({
      name: QUEUE_NEW_MESSAGES,
    }),
    TypeOrmModule.forFeature([User, Message, Label]),
  ],
  providers: [
    GmailService,
    Logger,
    GoogleOauthService,
    UserService,
    QueueService,
  ],
  exports: [GmailService, GoogleOauthService],
  controllers: [GmailController],
})
export class GmailModule {}
