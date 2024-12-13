import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth-dialog',
  template: `
    <h1 mat-dialog-title>Google Authentication</h1>
    <div mat-dialog-content>
      <p>Please wait while we redirect you to Google for authentication...</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
    </div>
  `,
  styles: [`
    h1 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    button {
      font-size: 1rem;
    }
  `]
})
export class AuthDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private authService: AuthService
  ) {
    this.authService.signUpWithGoogle().subscribe(
      (response: any) => {
        if (response && response.redirectUrl) {
          window.open(response.redirectUrl, '_blank');
          this.dialogRef.close();
        } else {
          console.error('Google sign-up failed');
        }
      },
      (error) => {
        console.error('Google sign-up error', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
