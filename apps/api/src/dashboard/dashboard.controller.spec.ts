import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { Logger } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { GmailService } from '../gmail/gmail.service';

describe('DashboardController', () => {
  let dashboardService: { getDashboardData: () => { messageCount: 42 } };
  let controller: DashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Logger, DashboardService, GmailService],
      controllers: [DashboardController],
    })
      .overrideProvider(DashboardService)
      .useValue(dashboardService)
      .overrideProvider(GmailService)
      .useValue({ getMessageCount: () => 42 })
      .compile();

    controller = module.get<DashboardController>(DashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('index', () => {
    it('should return the dashboard data', async () => {
      const result = await controller.index();
      expect(result).toEqual({ messageCount: 42 });
    });
  });
});
