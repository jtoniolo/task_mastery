import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    this.logger.log('getData method called');
    const data = this.appService.getData();
    this.logger.log('getData method response', data);
    return data;
  }
}
