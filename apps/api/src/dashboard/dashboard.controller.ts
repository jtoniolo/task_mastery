import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOAuth2 } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { DashboardDto } from './dto/dashboard.dto';

@Controller('dashboard')
@ApiOAuth2([], 'bearer')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly logger: Logger,
  ) {}

  @Get('index')
  async index(): Promise<DashboardDto> {
    const data = await this.dashboardService.getDashboardData();
    return data;
  }
}
