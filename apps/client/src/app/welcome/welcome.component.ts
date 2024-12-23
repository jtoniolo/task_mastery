import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  private readonly document = inject(DOCUMENT);
  signUpWithGoogle(): void {
    this.document.open(
      '/api/v1/auth/google',
      'Authenticate with Google',
      'width=500,height=600'
    );
  }
}
