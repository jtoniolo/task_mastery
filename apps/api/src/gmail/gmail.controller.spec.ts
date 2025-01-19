import { Test, TestingModule } from '@nestjs/testing';
import { GmailController } from './gmail.controller';
import { QueueService } from '../queue/queue.service';
import { Logger } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { getQueueToken } from '@nestjs/bullmq';
import { QUEUE_NEW_MESSAGES, QUEUE_NEW_USER } from '../queue/queue.constants';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GmailService } from './gmail.service';

export const mockBullQueue: any = {
  add: jest.fn(),
  process: jest.fn(),
};

describe('GmailController', () => {
  let controller: GmailController;
  const repoMock = {};
  const gmailService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getQueueToken(QUEUE_NEW_USER), useValue: mockBullQueue },
        { provide: getQueueToken(QUEUE_NEW_MESSAGES), useValue: mockBullQueue },
        { provide: getRepositoryToken(User), useValue: repoMock },
        { provide: GmailService, useValue: gmailService },
        Logger,
        QueueService,
      ],
      controllers: [GmailController],
    }).compile();

    controller = module.get<GmailController>(GmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
