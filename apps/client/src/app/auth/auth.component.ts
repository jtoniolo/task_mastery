import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppFacade } from '../+state/app.facade';

@Component({
  selector: 'app-auth',
  template: ``,
  styles: ``,
})
export class AuthComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  #facade = inject(AppFacade);

  ngOnInit(): void {
    // Get the token from the URL the Angular way
    this.#facade.authenticated('token');
    if (window.close) window.close();
  }
}
