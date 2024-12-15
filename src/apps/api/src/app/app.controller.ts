import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger
  ) {}

  @Get()
  getData() {
    this.logger.log('getData method called', AppController.name);
    const data = this.appService.getData();
    this.logger.log(
      'getData method response ' + JSON.stringify(data),
      AppController.name
    );
    return data;
  }
}
