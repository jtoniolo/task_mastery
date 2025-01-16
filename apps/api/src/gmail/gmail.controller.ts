import { InjectQueue } from '@nestjs/bullmq';
import { Controller, Get, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Queue } from 'bullmq';
import { Repository } from 'typeorm';

import { QUEUE_NEW_USER } from '../queue/queue.constants';
import { QueueService } from '../queue/queue.service';
import { User } from '../users/entities/user.entity';
import { Public } from '../auth/public.decorator';

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
  //TODO: Remove endpoint after testing Issue #59 (Task) assgined to Jeff for this work
  async get() {
    const user = await this.userRepository.findOne({
      where: { email: 'jeff.toniolo@gmail.com' },
    });
    // This will trigger gmail sync
    try {
      await this.queueService.addNewUserJob(user);
    } catch (e) {
      this.logger.error(`Failed to add job to queue: ${e}`, e?.stack);
    }
    return 'Hello';
  }
}
