import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QUEUE_NEW_USER } from 'queue/queue.constants';
import { QueueModule } from 'queue/queue.module';
import { User } from 'users/entities/user.entity';
import { Message } from './entities/message.entity';

@Module({
  imports: [
    QueueModule.register({
      queues: [QUEUE_NEW_USER],
    }),
    TypeOrmModule.forFeature([User, Message]),
  ],
})
export class GmailModule {}
