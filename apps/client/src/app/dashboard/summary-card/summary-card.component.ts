import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'tsm-summary-card',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
  ],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent {
  label = input.required<string>();
  datasource = input.required<SummaryItem[]>();
  drillDown = output<string>();
  inboxCountWarning = input<boolean | undefined>();
}

export interface SummaryItem {
  title: string;
  value?: number;
  drillDownKey?: string;
}
