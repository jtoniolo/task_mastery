import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { QUEUE_NEW_MESSAGES, QUEUE_NEW_USER } from 'queue/queue.constants';
import { UserDto } from 'users/dto/user.dto';
import { GmailClient } from './gmail.client';
import { GmailService } from './gmail.service';
import { User } from 'users/entities/user.entity';
import { MessageList } from './entities/message.entity';

@Processor(QUEUE_NEW_USER)
export class NewUserConsumer extends WorkerHost {
  constructor(
    private readonly service: GmailService,
    @InjectQueue(QUEUE_NEW_MESSAGES) private readonly newMessagesQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<User, any, string>) {
    const userId = job.data._id.toHexString();
    const client = new GmailClient(job.data.accessToken);
    let list: MessageList;
    do {
      list = await client.listEmail();
      const messages = await this.service.saveEmailsAsync(
        list.messages.map((message) => ({ ...message, userId })),
      );
      const messageIds = messages.map((message) => message._id.toHexString());
      await this.newMessagesQueue.add('get', {
        accssToken: job.data.accessToken,
        userId,
        messageIds,
      });
    } while (list.nextPageToken);
  }

  private async fetchEmails(auth: string) {}
}
