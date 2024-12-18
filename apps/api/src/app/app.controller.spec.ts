import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from '../logger/logger.module';

describe('AppController', () => {
	let appController: AppController;
	let appService: AppService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [LoggerModule],
			controllers: [AppController],
			providers: [
				{
					provide: AppService,
					useValue: { getData: () => 'Hello API' },
				},
			],
		}).compile();

		appController = module.get<AppController>(AppController);
		appService = module.get<AppService>(AppService);
	});

	it('should return "Hello API"', () => {
		expect(appController.getData()).toBe('Hello API');
	});
});