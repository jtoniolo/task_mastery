import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectLiteral } from 'typeorm';

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
        messageCount: await this.getCountByQuery({}),
        unreadMessageCount: await this.getCountByQuery({ labelIds: 'UNREAD' }),
        inboxMessageCount: await this.getCountByQuery({ labelIds: 'INBOX' }),
        sentMessageCount: await this.getCountByQuery({ labelIds: 'SENT' }),
        archivedMessageCount: await this.getCountByQuery({
          labelIds: { $nin: ['INBOX', 'SENT', 'DRAFT'] },
        }),
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
  private async getCountByQuery(query: ObjectLiteral): Promise<number> {
    try {
      return await this.messageRepository.countBy({
        userId: this.userId,
        ...query,
      });
    } catch (error) {
      this.logger.error(`Error getting message count for user`, error);
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

  async getTop10AggregateCount(
    pipeline: ObjectLiteral[],
  ): Promise<SenderCountDto[]> {
    try {
      const _pipeline = [
        {
          $match: {
            userId: this.userId,
          },
        },
        ...pipeline,
        { $sort: { count: -1 } },
        { $limit: 10 },
      ];
      const values = await this.messageRepository
        .aggregate(_pipeline, {})
        .project<{ _id: string; count: number }>({ _id: 1, count: 1 })
        .toArray();

      return values.map((value) => ({
        sender: value._id,
        count: value.count,
      }));
    } catch (error) {
      this.logger.error(
        `Error getting top ten aggregate count for user`,
        error,
      );
      throw error;
    }
  }

  async getTopTenSenderCount(): Promise<SenderCountDto[]> {
    return this.getTop10AggregateCount([
      {
        $unwind: {
          path: '$from',
        },
      },
      {
        $group: {
          _id: '$from.address',
          count: { $count: {} },
        },
      },
    ]);
  }

  async getTopTenSenderDomainCount(): Promise<SenderCountDto[]> {
    return this.getTop10AggregateCount([
      {
        $group: {
          _id: '$from.domain',
          count: { $count: {} },
        },
      },
    ]);
  }

  async getTopTenLabelsCount(): Promise<LabelCountDto[]> {
    const labelCounts = await this.getTop10AggregateCount([
      {
        // exclude emails with no labels and IMPORTANT, INBOX, SENT, DRAFT, UNREAD
        $match: {
          labelIds: { $nin: ['INBOX', 'SENT', 'DRAFT', 'UNREAD'] },
        },
      },
      { $unwind: '$labelIds' },
      {
        $group: {
          _id: '$labelIds',
          count: { $count: {} },
        },
      },
    ]);

    return labelCounts.map((labelCount) => ({
      labelId: labelCount.sender,
      count: labelCount.count,
    }));
  }
}
