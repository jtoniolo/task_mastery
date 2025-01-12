import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AppFacade } from '../+state/app.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'tsm-dashboard',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.#facade.dashboardOpen();
  }
  readonly #facade = inject(AppFacade);
  profile = toSignal(this.#facade.profile$);

  load() {
    this.#facade.dashboardOpen();
  }
}
