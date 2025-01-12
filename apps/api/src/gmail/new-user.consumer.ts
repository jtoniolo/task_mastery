import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUE_NEW_USER } from 'queue/queue.constants';
import { UserDto } from 'users/dto/user.dto';

@Processor(QUEUE_NEW_USER)
export class NewUserConsumer extends WorkerHost {
  async process(job: Job<UserDto, any, string>) {
    console.log(job.data);
  }
}
