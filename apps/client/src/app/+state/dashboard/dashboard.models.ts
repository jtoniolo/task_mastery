export interface DashboardSummaryItem {
  title: string;
  value: number;
  drillDownKey?: string;
}

export interface DashboardSenderCount {
  title: string;
  value: number;
  drillDownKey: string;
}

export interface DashboardData {
  summary: DashboardSummaryItem[];
  topTenSenders: DashboardSenderCount[];
  topTenSenderDomains: DashboardSenderCount[];
  topTenLabels: DashboardSummaryItem[];
}
