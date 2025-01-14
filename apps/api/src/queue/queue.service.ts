import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { User } from 'users/entities/user.entity';
import { NewMessagesRequest } from './models/new-messages.request';
import { QUEUE_NEW_MESSAGES, QUEUE_NEW_USER } from './queue.constants';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QUEUE_NEW_MESSAGES) private readonly newMessagesQueue: Queue,
    @InjectQueue(QUEUE_NEW_USER) private readonly newUserQueue: Queue,
    private readonly logger: Logger,
  ) {}

  /**
   * Adds a new user job to the queue.
   *
   * @param data - The user data to be processed.
   * @returns A promise that resolves when the job is added to the queue.
   */
  async addNewUserJob(data: User): Promise<void> {
    await this.newUserQueue.add('new-user', data, {
      removeOnComplete: true,
      removeOnFail: false,
    });
  }

  /**
   * Adds a new messages job to the queue.
   *
   * @param data - The new messages request data to be processed.
   * @returns A promise that resolves when the job is added to the queue.
   * @throws An error if required fields are missing.
   */
  async addNewMessagesJob(data: NewMessagesRequest): Promise<void> {
    if (!data.userId && (!data.access_token || !data.refresh_token)) {
      this.logger.error(
        `Required fields are missing. Included fields userID: ${!!data.userId}, access_token: ${!!data.access_token}, refresh_token: ${!!data.refresh_token}`,
      );
      throw new Error(
        'Required fields are missing. Please provide userId or access_token and refresh_token.',
      );
    }
    if (!data.messageIds.length) {
      this.logger.warn('No messages to process');
      return;
    }
    await this.newMessagesQueue.add('new-messages', data, {
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}
