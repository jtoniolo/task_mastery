import { Component, inject, OnInit } from '@angular/core';
import { AppFacade } from '../+state/app.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { DashboardFacade } from '../+state';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { GmailFacade } from '../+state/gmail/gmail.facade';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
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
  private readonly dialog = inject(MatDialog);
  readonly #facade = inject(AppFacade);
  readonly #dashboardFacade = inject(DashboardFacade);
  readonly #gmailFacade = inject(GmailFacade);
  displayedColumns: string[] = ['title', 'value'];

  profile = toSignal(this.#facade.profile$);
  dashboard = toSignal(this.#dashboardFacade.dashboard$);
  labels = toSignal(this.#gmailFacade.labels$);
  unprocessedMessages = toSignal(this.#dashboardFacade.unprocessedMessages$);

  private keyToMessage(key: string) {
    if (key.startsWith('sender:')) {
      return `ALL emails from ${key.split(':')[1]}`;
    }
    if (key.startsWith('label:')) {
      const label = this.labels()?.find((l) => l.labelId === key.split(':')[1]);
      return `ALL emails with label "${label?.name ?? key.split(':')[1]}"`;
    }
    if (key.startsWith('domain:')) {
      return `ALL emails from anyone @${key.split(':')[1]}`;
    }

    switch (key) {
      case 'inbox':
        return 'ALL inbox emails';
      case 'unread':
        return 'ALL unread emails';
      case 'starred':
        return 'ALL starred emails';
      case 'sent':
        return 'ALL sent emails';
      case 'archived':
        return 'ALL archived emails';
      case 'olderThan10Years':
        return 'ALL emails older than 10 years';
      case 'olderThan5Years':
        return 'ALL emails older than 5 years';
      case 'olderThan3Years':
        return 'ALL emails older than 3 years';
      case 'olderThan1Year':
        return 'ALL emails older than 1 year';
      case 'olderThan6Months':
        return 'ALL emails older than 6 months';
      case 'olderThan3Months':
        return 'ALL emails older than 3 months';
      default:
        return 'ALL selected emails';
    }
  }

  drillDown(key: string) {
    // We'll build this in a future user story
    this.#dashboardFacade.drillDown(key);
  }

  quickDelete(key: string) {
    // We'll build this in a future user story

    const emailsToDelete = this.keyToMessage(key);

    const ref = this.dialog.open(DialogComponent, {
      data: {
        type: 'Delete',
        title: 'Quick Delete Emails',
        message: `Are you sure you want to delete <strong>${emailsToDelete}</strong>? This action cannot be undone.`,
      },
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.#dashboardFacade.quickDelete(key);
      }
    });
  }

  load() {
    this.#facade.dashboardOpen();
  }
}
