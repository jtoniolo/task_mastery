import { Component, inject, OnInit, computed } from '@angular/core';
import { AppFacade } from '../+state/app.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardFacade } from '../+state';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { GmailFacade } from '../+state/gmail/gmail.facade';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'tsm-dashboard',
  imports: [
    CommonModule,
    SummaryCardComponent,
    BaseChartDirective,
    MatCardModule,
  ],
  providers: [DashboardFacade],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  console = console;
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
  private readonly backgroundColors = [
    'rgba(255, 0, 0, 0.5)', // Red
    'rgba(255, 72, 0, 0.5)', // Orange Red
    'rgba(255, 166, 0, 0.5)', // Orange
    'rgba(255, 255, 0, 0.5)', // Yellow
    'rgba(127, 255, 0, 0.5)', // Chartreuse Green
    'rgba(0, 255, 0, 0.5)', // Green
    'rgba(0, 255, 127, 0.5)', // Spring Green
    'rgba(0, 255, 255, 0.5)', // Cyan
    'rgba(0, 127, 255, 0.5)', // Azure
    'rgba(0, 0, 255, 0.5)', // Blue
    'rgba(127, 0, 255, 0.5)', // Violet
    'rgba(255, 0, 255, 0.5)', // Magenta
  ];

  chartOptions = {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
    },
    events: [
      'mousemove',
      'mouseout',
      'click',
      'touchstart',
      'touchmove',
      'contextmenu',
    ],
  };

  summaryChart = computed(() => {
    return {
      type: 'bar',
      datasets: [
        {
          label: 'Message count',
          data:
            this.dashboard()
              ?.summary.filter((i) => i.title != 'Total Messages')
              .sort((a, b) => b.value - a.value)
              ?.slice(0, 5) ?? [],
          backgroundColor: this.backgroundColors,
          parsing: {
            yAxisKey: 'title',
            xAxisKey: 'value',
          },
        },
      ],
      options: {
        parsing: {
          xAxisKey: 'title',
          yAxisKey: 'value',
        },
        interaction: {
          mode: 'index',
          axis: 'y',
        },
      },
    };
  });

  senderChart = computed(() => {
    return {
      type: 'bar',
      datasets: [
        {
          label: 'Message count',
          data: this.dashboard()?.topTenSenders?.slice(0, 5) ?? [],
          backgroundColor: this.backgroundColors,
          parsing: {
            yAxisKey: 'title',
            xAxisKey: 'value',
          },
        },
      ],
      options: {
        parsing: {
          xAxisKey: 'title',
          yAxisKey: 'value',
        },
        interaction: {
          mode: 'index',
          axis: 'y',
        },
      },
    };
  });

  senderDomainChart = computed(() => {
    return {
      type: 'bar',
      datasets: [
        {
          label: 'Message count',

          data: this.dashboard()?.topTenSenderDomains?.slice(0, 5) ?? [],
          backgroundColor: this.backgroundColors,
          parsing: {
            yAxisKey: 'title',
            xAxisKey: 'value',
          },
        },
      ],
      options: {
        parsing: {
          xAxisKey: 'title',
          yAxisKey: 'value',
        },
        interaction: {
          mode: 'index',
          axis: 'y',
        },
      },
    };
  });

  labelChart = computed(() => {
    return {
      type: 'bar',
      datasets: [
        {
          label: 'Message count',
          data:
            this.dashboard()
              ?.topTenLabels?.slice(0, 5)
              ?.map((d) => {
                return {
                  queryKey: d.queryKey,
                  title:
                    this.labels()?.find((l) => l.labelId == d.title)?.name ??
                    d.title,
                  value: d.value,
                };
              }) ?? [],
          backgroundColor: this.backgroundColors,
          parsing: {
            yAxisKey: 'title',
            xAxisKey: 'value',
          },
        },
      ],
      options: {
        parsing: {
          xAxisKey: 'title',
          yAxisKey: 'value',
        },
        interaction: {
          mode: 'index',
          axis: 'y',
        },
      },
    };
  });

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

  chartClick(event: any) {
    const index = event.active[0]?.index;
    const key = this.dashboard()?.summary[index + 1].queryKey;
    console.log(
      'Chart event',
      index,
      key,
      this.dashboard()?.summary[index + 1],
      event,
    );

    if (event.event.type === 'contextmenu') {
      event?.event?.native?.preventDefault();
      console.log(!!event?.event?.native?.preventDefault);
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
