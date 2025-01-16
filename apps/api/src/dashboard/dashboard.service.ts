import { Injectable, Logger } from '@nestjs/common';
import { GmailService } from '../gmail/gmail.service';
import { DashboardDto } from './dto/dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(
    private readonly gmailService: GmailService,
    private readonly logger: Logger,
  ) {}

  async getDashboardData(): Promise<DashboardDto> {
    try {
      const messageCount = await this.gmailService.getMessageCount();
      this.logger.debug(`Found ${messageCount} messages for user`);
      return { messageCount };
    } catch (error) {
      this.logger.error(`Error getting dashboard data for user`, error);
      throw error;
    }
  }
}
