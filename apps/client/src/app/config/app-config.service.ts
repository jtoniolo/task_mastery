import { inject, Inject, Injectable } from '@angular/core';
import { AppConfig } from './app-config';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private readonly appConfig: AppConfig;
  @Inject(DOCUMENT) private readonly doc: any = inject(DOCUMENT);

  constructor() {
    const win = this.doc.defaultView;
    // Unit tests don't have access to the window object, so we need to provide a default value.
    this.appConfig = (win?.EmailSweeper as AppConfig) ?? {
      title: 'Email Sweeper',
      apiBaseUrl: '',
      isFromDefault: true,
    };
  }

  get config(): AppConfig {
    return this.appConfig;
  }

  get isLoaded(): boolean {
    // The config should be loaded from the window object if it's not the default.
    return !this.appConfig?.isFromDefault;
  }
}
