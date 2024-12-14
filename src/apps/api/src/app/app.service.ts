import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getData(): { message: string } {
    this.logger.log('getData method called');
    const data = { message: 'Hello API' };
    this.logger.log('getData method response', data);
    return data;
  }
}
