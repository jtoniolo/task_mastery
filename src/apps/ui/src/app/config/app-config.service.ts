import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, of } from 'rxjs';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private readonly http = inject(HttpClient);
  private appConfig = {} as AppConfig;

  loadAppConfig(): Observable<AppConfig> {
    return this.http.get('/config.json').pipe(
      map((data) => {
        this.appConfig = data as AppConfig;
        return data as AppConfig;
      })
    );

    // for testing, lets just return a static object
    // return of({
    //   apiBaseUrl: 'http://localhost:3000',
    // });
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
