import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { Message } from '../gmail/entities/message.entity';
import {
  DashboardDto,
  LabelCountDto,
  SenderCountDto,
} from './dto/dashboard.dto';

@Injectable({ scope: Scope.REQUEST })
export class DashboardService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Message)
    private readonly messageRepository: MongoRepository<Message>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  private get userId(): string {
    return this.request['user'].id ?? '';
  }

  async getDashboardData(): Promise<DashboardDto> {
    try {
      return {
        messageCount: await this.getMessageCount(),
        unreadMessageCount: await this.getUnreadMessageCount(),
        topTenSenderCount: await this.getTopTenSenderCount(),
        topTenSenderDomainCount: await this.getTopTenSenderDomainCount(),
        topTenLabelsCount: await this.getTopTenLabelsCount(),
        emailsOlderThan10Years:
          await this.getEmailsOlderThanMonthsButLessThanMonths(
            10 * 12,
            Infinity,
          ),
        emailsOlderThan5Years:
          await this.getEmailsOlderThanMonthsButLessThanMonths(5 * 12, 10 * 12),
        emailsOlderThan3Years:
          await this.getEmailsOlderThanMonthsButLessThanMonths(3 * 12, 5 * 12),
        emailsOlderThan1Year:
          await this.getEmailsOlderThanMonthsButLessThanMonths(1 * 12, 3 * 12),
        emailsOlderThan6Months:
          await this.getEmailsOlderThanMonthsButLessThanMonths(6, 12),
        emailsOlderThan3Months:
          await this.getEmailsOlderThanMonthsButLessThanMonths(3, 6),
        emailsOlderThan1Month:
          await this.getEmailsOlderThanMonthsButLessThanMonths(1, 3),
      };
    } catch (error) {
      this.logger.error(`Error getting dashboard data for user`, error);
      throw error;
    }
  }

  private async getMessageCount(): Promise<number> {
    try {
      return await this.messageRepository.countBy({ userId: this.userId });
    } catch (error) {
      this.logger.error(`Error getting message count for user`, error);
      throw error;
    }
  }

  private async getUnreadMessageCount(): Promise<number> {
    try {
      return await this.messageRepository.countBy({
        userId: this.userId,
        labelIds: 'UNREAD',
      });
    } catch (error) {
      this.logger.error(`Error getting unread message count for user`, error);
      throw error;
    }
  }

  private async getEmailsCountByDateRange(
    minDate: Date,
    maxDate?: Date,
  ): Promise<number> {
    const dateCondition: any = { $gte: minDate };
    if (maxDate) {
      dateCondition.$lt = maxDate;
    }
    try {
      return await this.messageRepository.countBy({
        userId: this.userId,
        date: dateCondition,
      });
    } catch (error) {
      this.logger.error(
        `Error getting emails count by date range for user`,
        error,
      );
      throw error;
    }
  }

  async getEmailsOlderThanMonthsButLessThanMonths(
    minMonths: number,
    maxMonths: number,
  ): Promise<number> {
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() - maxMonths);
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() - minMonths);
    return this.getEmailsCountByDateRange(minDate, maxDate);
  }

  async getTopTenSenderCount(): Promise<SenderCountDto[]> {
    try {
      const values = await this.messageRepository
        .aggregate(
          [
            {
              $match: {
                userId: this.userId,
                from: {
                  $not: {
                    $regex: this.request['user'].email,
                    $options: 'i',
                  },
                },
              },
            },
            {
              $group: {
                _id: '$from',
                count: { $count: {} },
              },
            },
            { $sort: { count: -1 } },
            { $limit: 10 },
          ],
          {},
        )
        .project<{ _id: string; count: number }>({ _id: 1, count: 1 })
        .toArray();

      return values.map((value) => ({
        sender: value._id,
        count: value.count,
      }));
    } catch (error) {
      this.logger.error(`Error getting top ten sender count for user`, error);
      throw error;
    }
  }

  async getTopTenSenderDomainCount(): Promise<SenderCountDto[]> {
    try {
      const values = await this.messageRepository
        .aggregate(
          [
            {
              $match: {
                userId: this.userId,
                from: {
                  $not: {
                    $regex: this.request['user'].email,
                    $options: 'i',
                  },
                },
              },
            },
            {
              $group: {
                _id: {
                  $arrayElemAt: [{ $split: ['$from', '@'] }, 1],
                },
                count: { $count: {} },
              },
            },
            { $sort: { count: -1 } },
            { $limit: 10 },
          ],
          {},
        )
        .project<{ _id: string; count: number }>({ _id: 1, count: 1 })
        .toArray();

      return values.map((value) => ({
        sender: value._id,
        count: value.count,
      }));
    } catch (error) {
      this.logger.error(
        `Error getting top ten sender domain count for user`,
        error,
      );
      throw error;
    }
  }

  async getTopTenLabelsCount(): Promise<LabelCountDto[]> {
    try {
      const values = await this.messageRepository
        .aggregate(
          [
            {
              $match: {
                userId: this.userId,
                labelIds: { $nin: ['SENT', 'INBOX', 'UNREAD'] },
              },
            },
            { $unwind: '$labelIds' },
            {
              $group: {
                _id: '$labelIds',
                count: { $count: {} },
              },
            },
            { $sort: { count: -1 } },
            { $limit: 10 },
          ],
          {},
        )
        .project<{ _id: string; count: number }>({ _id: 1, count: 1 })
        .toArray();

      return values.map((value) => ({
        labelId: value._id,
        count: value.count,
      }));
    } catch (error) {
      this.logger.error(`Error getting top ten labels count for user`, error);
      throw error;
    }
  }
}
