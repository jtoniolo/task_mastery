import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AppConfigService } from '../config/app-config.service';
import { AppFacade } from '../+state/app.facade';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  #facade = inject(AppFacade);

  private readonly appConfig = inject(AppConfigService);
  private readonly document = inject(DOCUMENT);
  signUpWithGoogle(): void {
    this.#facade.apiBaseUrl$.subscribe((apiBaseUrl) => {
      this.document.open(
        apiBaseUrl + '/api/auth/google',
        'Authenticate with Google',
        'width=500,height=600'
      );
    });
  }
}
