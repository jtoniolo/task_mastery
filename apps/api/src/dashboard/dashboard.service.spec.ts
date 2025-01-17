import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { Message } from '../gmail/entities/message.entity';

describe('DashboardService', () => {
  let service: DashboardService;
  const messageRepository = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        Logger,
        {
          provide: getRepositoryToken(Message),
          useValue: messageRepository,
        },
      ],
    }).compile();

    service = await module.resolve<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests here
});
