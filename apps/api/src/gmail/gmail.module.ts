import { Module } from '@nestjs/common';
import { QUEUE_NEW_USER } from 'queue/queue.constants';
import { QueueModule } from 'queue/queue.module';

@Module({
  imports: [
    QueueModule.register({
      queues: [QUEUE_NEW_USER],
    }),
  ],
})
export class GmailModule {}
