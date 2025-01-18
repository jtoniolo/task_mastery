import { Component, inject, OnInit } from '@angular/core';
import { AppFacade } from '../+state/app.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { DashboardFacade } from '../+state';
import { map } from 'rxjs';
import { SummaryCardComponent } from './summary-card/summary-card.component';
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
  displayedColumns: string[] = ['title', 'value'];

  profile = toSignal(this.#facade.profile$);
  dashboard = toSignal(
    this.#dashboardFacade.dashboard$.pipe(
      map((dashboard) => {
        return {
          summary: [
            { title: 'Total Messages', value: dashboard?.messageCount },
            {
              title: 'Unread Messages',
              value: dashboard?.unreadMessageCount,
              drillDownKey: 'unread',
            },
            {
              title: 'Emails Older Than 10 Years',
              value: dashboard?.emailsOlderThan10Years,
              drillDownKey: 'olderThan10Years',
            },
            {
              title: 'Emails Older Than 5 Years',
              value: dashboard?.emailsOlderThan5Years,
              drillDownKey: 'olderThan5Years',
            },
            {
              title: 'Emails Older Than 3 Years',
              value: dashboard?.emailsOlderThan3Years,
              drillDownKey: 'olderThan3Years',
            },
            {
              title: 'Emails Older Than 1 Year',
              value: dashboard?.emailsOlderThan1Year,
              drillDownKey: 'olderThan1Year',
            },
            {
              title: 'Emails Older Than 6 Months',
              value: dashboard?.emailsOlderThan6Months,
              drillDownKey: 'olderThan6Months',
            },
            {
              title: 'Emails Older Than 3 Months',
              value: dashboard?.emailsOlderThan3Months,
              drillDownKey: 'olderThan3Months',
            },
            {
              title: 'Emails Older Than 1 Month',
              value: dashboard?.emailsOlderThan1Month,
              drillDownKey: 'olderThan1Month',
            },
          ],
          topTenSenders: dashboard?.topTenSenderCount.map((sender) => ({
            title: sender.sender,
            value: sender.count,
            drillDownKey: 'sender:' + sender.sender,
          })),
          topTenSenderDomains: dashboard?.topTenSenderDomainCount.map(
            (sender) => ({
              title: sender.sender,
              value: sender.count,
              drillDownKey: 'domain:' + sender.sender,
            }),
          ),
          topTenLabels: dashboard?.topTenLabelsCount.map((label) => ({
            title: label.labelId,
            value: label.count,
            drillDownKey: 'label:' + label.labelId,
          })),
        };
      }),
    ),
  );

  drillDown(key: string) {
    // We'll build this in a future user story
    console.log('Drill down to', key);
  }

  load() {
    this.#facade.dashboardOpen();
  }
}
