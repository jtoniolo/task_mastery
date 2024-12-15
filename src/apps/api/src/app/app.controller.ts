import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('app')
@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger
  ) {}

  @Get()
  @Throttle(10, 60)
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
