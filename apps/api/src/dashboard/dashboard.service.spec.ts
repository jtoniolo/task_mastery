import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { GmailService } from '../gmail/gmail.service';
import { Logger } from '@nestjs/common';

describe('DashboardService', () => {
  let service: DashboardService;
  let gmailService: GmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: GmailService,
          useValue: {
            getMessageCount: jest.fn(), // Mock the methods you need
          },
        },

        Logger,
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    gmailService = module.get<GmailService>(GmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests here
});
