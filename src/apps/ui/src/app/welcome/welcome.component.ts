import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AppConfigService } from '../config/app-config.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  private readonly appConfig = inject(AppConfigService);
  private readonly document = inject(DOCUMENT);
  signUpWithGoogle(): void {
    this.document.open(
      this.appConfig.apiBaseUrl + '/api/auth/google',
      'Authenticate with Google',
      'width=500,height=600'
    );
  }
}
