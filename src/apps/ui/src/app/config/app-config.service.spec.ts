import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AppConfigService } from './app-config.service';
import { AppConfig } from './app-config';
import { provideHttpClient } from '@angular/common/http';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AppConfigService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AppConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return the app config', () => {
    const mockConfig: AppConfig | undefined = {
      apiBaseUrl: 'http://localhost:3000',
    };
    service['appConfig'] = mockConfig;

    expect(service.config).toEqual(mockConfig);
  });

  it('should return an empty object if app config is not set', () => {
    expect(service.config).toEqual({} as AppConfig);
  });

  it('should return true if config is loaded', () => {
    service['appConfig'] = { apiBaseUrl: 'http://localhost:3000' };
    expect(service.isLoaded).toBeTruthy();
  });

  it('should return false if config is not loaded', () => {
    service['appConfig'] = undefined;
    expect(service.isLoaded).toBeFalsy();
  });
});
