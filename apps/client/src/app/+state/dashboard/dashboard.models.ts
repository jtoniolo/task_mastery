export interface DashboardSummaryItem {
  title: string;
  value: number;
  queryKey?: string;
}

export interface DashboardData {
  summary: DashboardSummaryItem[];
  inboxCountWarning: boolean;
  topTenSenders: DashboardSummaryItem[];
  topTenSenderDomains: DashboardSummaryItem[];
  topTenLabels: DashboardSummaryItem[];
}
