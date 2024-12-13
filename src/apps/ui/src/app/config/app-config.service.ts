import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private readonly http = inject(HttpClient);
  private appConfig = {} as AppConfig;

  loadAppConfig(): Observable<void> {
    return this.http.get('/assets/config.json').pipe(
      map((data) => {
        this.appConfig = data as AppConfig;
      })
    );
  }

  get apiBaseUrl(): string {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.apiBaseUrl;
  }

  get config(): AppConfig {
    return this.appConfig;
  }

  get isLoaded(): boolean {
    return !!this.appConfig;
  }
}
