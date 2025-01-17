import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { Message } from '../gmail/entities/message.entity';
import { DashboardDto } from './dto/dashboard.dto';

@Injectable({ scope: Scope.REQUEST })
export class DashboardService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Message)
    private readonly messageRepository: MongoRepository<Message>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}
  private getUserId(): string {
    return this.request['user'].id;
  }
  private get userId(): string {
    return this.request['user'].id ?? '';
  }

  async getDashboardData(): Promise<DashboardDto> {
    try {
      const messageCount = await this.getMessageCount();
      this.logger.debug(`Found ${messageCount} messages for user`);
      return { messageCount };
    } catch (error) {
      this.logger.error(`Error getting dashboard data for user`, error);
      throw error;
    }
  }

  async getMessageCount(): Promise<number> {
    try {
      return await this.messageRepository.countBy({ userId: this.userId });
    } catch (error) {
      this.logger.error(`Error getting message count for user`, error);
      throw error;
    }
  }
}
