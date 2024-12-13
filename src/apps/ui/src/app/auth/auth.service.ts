import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signUpWithGoogle() {
    this.http.get('/api/auth/google').subscribe(
      (response: any) => {
        if (response && response.redirectUrl) {
          window.location.href = response.redirectUrl;
        } else {
          console.error('Google sign-up failed');
        }
      },
      (error) => {
        console.error('Google sign-up error', error);
      }
    );
  }
}
