import { InjectQueue } from '@nestjs/bullmq';
import { Controller, Get, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Public } from 'auth/public.decorator';
import { Queue } from 'bullmq';
import { QUEUE_NEW_USER } from 'queue/queue.constants';
import { QueueService } from 'queue/queue.service';
import { Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Controller('gmail')
export class GmailController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectQueue(QUEUE_NEW_USER) private readonly newUserQueue: Queue,
    private readonly queueService: QueueService,
    private readonly logger: Logger,
  ) {}

  @Public()
  @Get()
  async get() {
    const user = await this.userRepository.findOne({
      where: { email: 'jeff.toniolo@gmail.com' },
    });
    // This will trigger gmail sync
    //TODO: Remove queue related code after testing
    try {
      await this.queueService.addNewUserJob(user);
    } catch (e) {
      this.logger.error(`Failed to add job to queue: ${e}`, e?.stack);
    }
    return 'Hello';
  }
}
