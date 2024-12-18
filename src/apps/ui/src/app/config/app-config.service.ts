import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private readonly http = inject(HttpClient);
  private appConfig: AppConfig | undefined;

  loadAppConfig(): Observable<AppConfig> {
    console.log('Loading app config...');
    return this.http.get('/config.json').pipe(
      map((data) => {
        this.appConfig = data as AppConfig;
        console.log('App config loaded:', this.appConfig);
        return data as AppConfig;
      }),
      catchError((error) => {
        console.error('Error loading app config:', error);
        return of({} as AppConfig);
      })
    );

    // for testing, lets just return a static object
    // return of({
    //   apiBaseUrl: 'http://localhost:3000',
    // });
  }

  get config(): AppConfig {
    return this.appConfig || ({} as AppConfig);
  }

  get isLoaded(): boolean {
    return !!this.appConfig;
  }
}
