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

  private getUserId(): string {
    return this.request['user'].id;
  }

  private get userId(): string {
    return this.request['user'].id ?? '';
  }

  async getDashboardData(): Promise<DashboardDto> {
    try {
      const messageCount = await this.getMessageCount();
      const unreadMessageCount = await this.getUnreadMessageCount();
      const topTenSenderCount = await this.getTopTenSenderCount();
      const topTenSenderDomainCount = await this.getTopTenSenderDomainCount();
      const topTenLabelsCount = await this.getTopTenLabelsCount();

      const emailsOlderThan10Years = await this.getEmailsOlderThanYears(10);
      const emailsOlderThan5Years =
        await this.getEmailsOlderThanYearsButLessThanYears(5, 10);
      const emailsOlderThan3Years =
        await this.getEmailsOlderThanYearsButLessThanYears(3, 5);
      const emailsOlderThan1Year =
        await this.getEmailsOlderThanYearsButLessThanYears(1, 3);
      const emailsOlderThan6Months =
        await this.getEmailsOlderThanMonthsButLessThanYears(6, 1);
      const emailsOlderThan3Months =
        await this.getEmailsOlderThanMonthsButLessThanMonths(3, 6);
      const emailsOlderThan1Month =
        await this.getEmailsOlderThanMonthsButLessThanMonths(1, 3);

      this.logger.debug(`Found ${unreadMessageCount} unread messages for user`);
      return {
        messageCount,
        unreadMessageCount,
        topTenSenderCount,
        topTenSenderDomainCount,
        topTenLabelsCount,
        emailsOlderThan10Years,
        emailsOlderThan5Years,
        emailsOlderThan3Years,
        emailsOlderThan1Year,
        emailsOlderThan6Months,
        emailsOlderThan3Months,
        emailsOlderThan1Month,
      };
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
  async getUnreadMessageCount(): Promise<number> {
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

  async getEmailsOlderThanYears(years: number): Promise<number> {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    try {
      return await this.messageRepository.countBy({
        userId: this.userId,
        date: { $lt: date },
      });
    } catch (error) {
      this.logger.error(
        `Error getting emails older than ${years} years for user`,
        error,
      );
      throw error;
    }
  }

  async getEmailsOlderThanYearsButLessThanYears(
    minYears: number,
    maxYears: number,
  ): Promise<number> {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - maxYears);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - minYears);
    try {
      return await this.messageRepository.countBy({
        userId: this.userId,
        date: { $gte: minDate, $lt: maxDate },
      });
    } catch (error) {
      this.logger.error(
        `Error getting emails older than ${minYears} years but less than ${maxYears} years for user`,
        error,
      );
      throw error;
    }
  }

  async getEmailsOlderThanMonthsButLessThanYears(
    minMonths: number,
    maxYears: number,
  ): Promise<number> {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - maxYears);
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() - minMonths);
    try {
      return await this.messageRepository.countBy({
        userId: this.userId,
        date: { $gte: minDate, $lt: maxDate },
      });
    } catch (error) {
      this.logger.error(
        `Error getting emails older than ${minMonths} months but less than ${maxYears} years for user`,
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
    try {
      return await this.messageRepository.countBy({
        userId: this.userId,
        date: { $gte: minDate, $lt: maxDate },
      });
    } catch (error) {
      this.logger.error(
        `Error getting emails older than ${minMonths} months but less than ${maxMonths} months for user`,
        error,
      );
      throw error;
    }
  }

  async getTopTenSenderCount(): Promise<SenderCountDto[]> {
    try {
      const values = await this.messageRepository
        .aggregate(
          [
            {
              // Match the documents where the userId is the current user AND the from field does not contain the user's email address.
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
                count: {
                  $count: {},
                },
              },
            },
            {
              $sort: {
                count: -1,
              },
            },
            {
              $limit: 10,
            },
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
              // Match the documents where the userId is the current user AND the from field does not contain the user's email address.
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
                  $arrayElemAt: [
                    {
                      $split: ['$from', '@'],
                    },
                    1,
                  ],
                },
                count: {
                  $count: {},
                },
              },
            },
            {
              $sort: {
                count: -1,
              },
            },
            {
              $limit: 10,
            },
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
              // Match the documents where the userId is the current user. and not SENT, INBOX, UNREAD
              $match: {
                userId: this.userId,
                labelIds: {
                  $nin: ['SENT', 'INBOX', 'UNREAD'],
                },
              },
            },
            {
              $unwind: '$labelIds',
            },
            {
              $group: {
                _id: '$labelIds',
                count: {
                  $count: {},
                },
              },
            },
            {
              $sort: {
                count: -1,
              },
            },
            {
              $limit: 10,
            },
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
