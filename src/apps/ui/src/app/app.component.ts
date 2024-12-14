import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppFacade } from './+state/app.facade';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  #facade = inject(AppFacade);

  ngOnInit(): void {
    this.#facade.init();
  }

  title = 'ui';
}
