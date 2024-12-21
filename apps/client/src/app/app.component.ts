import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFacade } from './+state/app.facade';

@Component({
  selector: 'tsm-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly #facade = inject(AppFacade);
  title = 'Task Mastery';
  ngOnInit(): void {
    // Initialize the app state!
    this.#facade.init();
  }
}
