import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppFacade } from './+state/app.facade';

@Component({
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly #facade = inject(AppFacade);

  ngOnInit(): void {
    // Initialize the app state!
    this.#facade.init();
  }

  title = 'ui';
}
