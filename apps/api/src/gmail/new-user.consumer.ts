import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUE_NEW_USER } from 'queue/queue.constants';
import { UserDto } from 'users/dto/user.dto';
import { GmailClient } from './gmail.client';
import { GmailService } from './gmail.service';
import { User } from 'users/entities/user.entity';

@Processor(QUEUE_NEW_USER)
export class NewUserConsumer extends WorkerHost {
  constructor(private readonly service: GmailService) {
    super();
  }

  async process(job: Job<User, any, string>) {}

  private async fetchEmails(auth: string) {
    const client = new GmailClient(auth);
    const list = await client.listEmail();
  }
}
