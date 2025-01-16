import { Logger, Module } from '@nestjs/common';
import { NewMessagesConsumer } from './new-messages.consumer';
import { NewUserConsumer } from './new-user.consumer';
import { QueueModule } from 'queue/queue.module';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NEW_MESSAGES, QUEUE_NEW_USER } from 'queue/queue.constants';
import { GmailModule } from 'gmail/gmail.module';
import { UserModule } from 'users/user.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NEW_USER,
    }),
    BullModule.registerQueue({
      name: QUEUE_NEW_MESSAGES,
    }),
    QueueModule,
    GmailModule,
    UserModule,
  ],
  controllers: [],
  providers: [NewMessagesConsumer, NewUserConsumer, Logger],
  exports: [NewMessagesConsumer, NewUserConsumer],
})
export class ProcessorsModule {}
