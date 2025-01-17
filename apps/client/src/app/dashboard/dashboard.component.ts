import { Component, inject, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { AppFacade } from '../+state/app.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { DashboardFacade } from '../+state';
import { map } from 'rxjs';
@Component({
  selector: 'tsm-dashboard',
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatGridListModule,
    MatTableModule,
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
  displayedColumns: string[] = ['title', 'value'];

  profile = toSignal(this.#facade.profile$);
  dashboard = toSignal(
    this.#dashboardFacade.dashboard$.pipe(
      map((dashboard) => {
        return {
          summary: [
            { title: 'Total Messages', value: dashboard?.messageCount },
            { title: 'Unread Messages', value: dashboard?.unreadMessageCount },
            {
              title: 'Emails Older Than 10 Years',
              value: dashboard?.emailsOlderThan10Years,
            },
            {
              title: 'Emails Older Than 5 Years',
              value: dashboard?.emailsOlderThan5Years,
            },
            {
              title: 'Emails Older Than 3 Years',
              value: dashboard?.emailsOlderThan3Years,
            },
            {
              title: 'Emails Older Than 1 Year',
              value: dashboard?.emailsOlderThan1Year,
            },
            {
              title: 'Emails Older Than 6 Months',
              value: dashboard?.emailsOlderThan6Months,
            },
            {
              title: 'Emails Older Than 3 Months',
              value: dashboard?.emailsOlderThan3Months,
            },
            {
              title: 'Emails Older Than 1 Month',
              value: dashboard?.emailsOlderThan1Month,
            },
          ],
          topTenSenders: dashboard?.topTenSenderCount,
          topTenSenderDomains: dashboard?.topTenSenderDomainCount,
          topTenLabels: dashboard?.topTenLabelsCount,
        };
      }),
    ),
  );

  load() {
    this.#facade.dashboardOpen();
  }
}
