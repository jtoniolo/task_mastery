import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { AppFacade } from '../+state/app.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { DashboardFacade } from '../+state';
@Component({
  selector: 'tsm-dashboard',
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatIconModule,
    MatBadgeModule,
  ],
  providers: [DashboardFacade],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.#facade.dashboardOpen();
    this.#dashboardFacade.dashboardOpen();
  }
  readonly #facade = inject(AppFacade);
  readonly #dashboardFacade = inject(DashboardFacade);
  profile = toSignal(this.#facade.profile$);
  dashboard = toSignal(this.#dashboardFacade.dashboard$);

  load() {
    this.#facade.dashboardOpen();
  }
}
