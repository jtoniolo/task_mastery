import { inject, Inject, Injectable } from '@angular/core';
import { AppConfig } from './app-config';
import { DOCUMENT } from '@angular/common';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private readonly http = inject(HttpClient);
  private appConfig: AppConfig = {} as AppConfig;
  @Inject(DOCUMENT) private readonly doc: any = inject(DOCUMENT);

  constructor() {
    this.http.get<AppConfig>('config.json').subscribe((config: AppConfig) => {
      this.appConfig = config;
    });
  }

  init(): Observable<AppConfig> {
    return this.http.get<AppConfig>('config.json').pipe(
      map((config: AppConfig) => {
        this.appConfig = config;
        return config;
      }),
    );
  }

  get config(): AppConfig {
    return this.appConfig;
  }

  get isLoaded(): boolean {
    // The config should be loaded from the window object if it's not the default.
    return !this.appConfig?.isFromDefault;
  }
}
