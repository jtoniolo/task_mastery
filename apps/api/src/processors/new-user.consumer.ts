import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';

import { Job } from 'bullmq';

import { GoogleOauthService } from 'gmail/google-oauth.service';
import { MessageList } from 'gmail/entities/message.entity';
import { GmailClient } from 'gmail/gmail.client';
import { GmailService } from 'gmail/gmail.service';
import { QUEUE_NEW_USER } from 'queue/queue.constants';
import { QueueService } from 'queue/queue.service';
import { User } from 'users/entities/user.entity';

@Processor(QUEUE_NEW_USER)
export class NewUserConsumer extends WorkerHost {
  constructor(
    private readonly service: GmailService,
    private readonly googleAuth: GoogleOauthService,
    private readonly queueService: QueueService,
    private readonly logger: Logger,
  ) {
    super();
  }

  async process(job: Job<User, any, string>) {
    this.logger.log(`Processing new user: ${job.data.email}`);
    const userId = job.data._id.toString();
    this.logger.log(`Gmail Sync triggered for new user: ${userId}`);
    const oauth2Client = this.googleAuth.getClient({
      access_token: job.data.accessToken,
      refresh_token: job.data.refreshToken,
      userId: job.data._id.toString(),
    });
    try {
      const client = new GmailClient(oauth2Client);
      let list: MessageList;
      let pageToken: string | undefined = undefined;
      let count = 0;
      do {
        list = await client.listEmail(pageToken);
        this.logger.debug(`Processing ${list.messages.length} messages`);

        const messages = list.messages.map((message) => ({
          ...message,
          userId,
        }));
        await this.service.saveEmailsAsync(messages, userId);

        count += messages.length;
        this.logger.debug(`Processed ${count} messages`);
        const messageIds = messages.map((message) => message._id.toHexString());
        // Get a more complete version of the message
        await this.queueService.addNewMessagesJob({
          access_token: job.data.accessToken,
          refresh_token: job.data.refreshToken,
          userId,
          messageIds,
          format: 'metadata',
        });
        pageToken = list.nextPageToken;
      } while (pageToken);
    } catch (error) {
      this.logger.error(
        `Error processing new user: ${error.message}`,
        error.stack,
      );
    }
  }
}
