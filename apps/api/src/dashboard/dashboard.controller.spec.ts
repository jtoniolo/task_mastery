import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { Logger } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

describe('DashboardController', () => {
  const dashboardService = {
    getDashboardData: () => {
      return { messageCount: 42 };
    },
  };
  let controller: DashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        {
          provide: DashboardService,
          useValue: dashboardService,
        },
      ],
      controllers: [DashboardController],
    })
      // .overrideProvider(DashboardService)
      // .useValue(dashboardService)
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
