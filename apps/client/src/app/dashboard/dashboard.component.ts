import { Component, inject, OnInit } from '@angular/core';
import { AppFacade } from '../+state/app.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { DashboardFacade } from '../+state';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { GmailFacade } from '../+state/gmail/gmail.facade';
@Component({
  selector: 'tsm-dashboard',
  imports: [CommonModule, SummaryCardComponent],
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
  readonly #gmailFacade = inject(GmailFacade);
  displayedColumns: string[] = ['title', 'value'];

  profile = toSignal(this.#facade.profile$);
  dashboard = toSignal(this.#dashboardFacade.dashboard$);
  labels = toSignal(this.#gmailFacade.labels$);

  drillDown(key: string) {
    // We'll build this in a future user story
    console.log('Drill down to', key);
  }

  load() {
    this.#facade.dashboardOpen();
  }
}
