import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'tsm-summary-card',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatListModule],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent {
  title = input.required<string>();
  datasource = input.required<SummaryItem[]>();
  drillDown = output<string>();
}

export interface SummaryItem {
  title: string;
  value?: number;
  drillDownKey?: string;
}
