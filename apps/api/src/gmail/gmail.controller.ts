import { InjectQueue } from '@nestjs/bullmq';
import { Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiOAuth2, ApiOkResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';

import { Queue } from 'bullmq';
import { Repository } from 'typeorm';

import { QUEUE_NEW_USER } from '../queue/queue.constants';
import { QueueService } from '../queue/queue.service';
import { User } from '../users/entities/user.entity';
import { Public } from '../auth/public.decorator';
import { GmailService } from './gmail.service';
import { LabelDto } from './dto/label.dto';

@Controller('gmail')
@ApiOAuth2([], 'bearer')
export class GmailController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectQueue(QUEUE_NEW_USER) private readonly newUserQueue: Queue,
    private readonly service: GmailService,
    private readonly queueService: QueueService,
    private readonly logger: Logger,
  ) {}

  @Public()
  @Post('simulate-new-user')
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

  @ApiOkResponse({
    type: LabelDto,
    isArray: true,
  })
  @Get('label')
  async getLabels(): Promise<LabelDto[]> {
    return (await this.service.getLabelsAsync()).map((label) => ({
      _id: label._id.toHexString(),
      userId: label.userId,
      labelId: label.labelId,
      name: label.name,
      type: label.type,
      messageListVisibility: label.messageListVisibility,
      labelListVisibility: label.labelListVisibility,
    }));
  }
}
