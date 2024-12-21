import { TestBed } from '@angular/core/testing';
import { AppConfigService } from './app-config.service';
import { AppConfig } from './app-config';
import { DOCUMENT } from '@angular/common';

describe('AppConfigService', () => {
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppConfigService],
    });
    doc = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    let service = TestBed.inject(AppConfigService);
    expect(service).toBeTruthy();
  });

  it('should return default config if window.EmailSweeper is not defined', () => {
    const defaultConfig: AppConfig = {
      title: 'Email Sweeper',
      apiBaseUrl: '',
      isFromDefault: true,
    };

    let service = TestBed.inject(AppConfigService);
    expect(service.config).toEqual(defaultConfig);
  });

  it('should return window.EmailSweeper config if defined', () => {
    const mockConfig: AppConfig = {
      title: 'Email Sweeper',
      apiBaseUrl: 'http://example.com',
      isFromDefault: false,
    };
    const win = doc.defaultView as any;
    win.EmailSweeper = mockConfig;

    // Reinitialize the service to pick up the new window.EmailSweeper value
    let service = TestBed.inject(AppConfigService);

    expect(service.config).toEqual(mockConfig);
  });

  it('should return true for isLoaded if config is defined', () => {
    let service = TestBed.inject(AppConfigService);
    expect(service.isLoaded).toBeTruthy();
  });

  it('should return false for isLoaded if config is not defined', () => {
    (window as any).EmailSweeper = undefined;
    let service = TestBed.inject(AppConfigService);

    // Reinitialize the service to pick up the new window.EmailSweeper value

    expect(service.isLoaded).toBeFalsy();
  });
});
