import { Test, TestingModule } from '@nestjs/testing';
import { getQueueToken } from '@nestjs/bullmq';
import { QueueService } from './queue.service';
import { QUEUE_NEW_MESSAGES, QUEUE_NEW_USER } from './queue.constants';
export const mockBullQueue: any = {
  add: jest.fn(),
  process: jest.fn(),
};
describe('QueueService', () => {
  let service: QueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueService,
        {
          provide: getQueueToken(QUEUE_NEW_USER),
          useValue: mockBullQueue,
        },
        {
          provide: getQueueToken(QUEUE_NEW_MESSAGES),
          useValue: mockBullQueue,
        },
      ],
    }).compile();

    service = module.get<QueueService>(QueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
