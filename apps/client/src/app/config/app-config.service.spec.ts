import { TestBed } from '@angular/core/testing';
import { AppConfigService } from './app-config.service';
import { AppConfig } from './app-config';
import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppFacade } from '../+state/app.facade';

describe('AppConfigService', () => {
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppFacade,
        AppConfigService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    doc = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    let service = TestBed.inject(AppConfigService);
    expect(service).toBeTruthy();
  });

  it('should return default config if config.json not found', () => {
    const defaultConfig: AppConfig = {
      title: 'Email Sweeper',
      apiBaseUrl: '',
      isFromDefault: true,
    };

    let service = TestBed.inject(AppConfigService);
    expect(service.config).toEqual(defaultConfig);
  });
});
