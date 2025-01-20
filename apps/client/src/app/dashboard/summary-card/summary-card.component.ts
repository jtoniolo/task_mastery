import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LabelPipe } from './label.pipe';

@Component({
  selector: 'tsm-summary-card',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    LabelPipe,
  ],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent {
  label = input.required<string>();
  datasource = input.required<SummaryItem[]>();
  drillDown = output<string>();
  quickDelete = output<string>();
  inboxCountWarning = input<boolean | undefined>();
  labels = input<LabelEntity[]>();
}

export interface SummaryItem {
  title: string;
  value?: number;
  queryKey?: string;
}

interface LabelEntity {
  labelId: string;
  name: string;
}
