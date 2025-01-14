import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { NewMessagesRequest } from 'queue/models/new-messages.request';
import { QUEUE_NEW_MESSAGES } from 'queue/queue.constants';

@Processor(QUEUE_NEW_MESSAGES)
export class NewMessagesConsumer extends WorkerHost {
  constructor(
    @InjectQueue(QUEUE_NEW_MESSAGES) private readonly newMessagesQueue: Queue,
    private readonly logger: Logger,
  ) {
    super();
  }

  async process(job: Job<NewMessagesRequest, any, string>) {
    this.logger.log(`Processing (${job.data.messageIds.length}) new messages`);
    console.log(job.data);
  }
}
