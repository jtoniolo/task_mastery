import { DashboardDto } from '../../proxy';
import { DashboardData } from './dashboard.models';

export const dashboardDtoToDashboardData = (
  dto: DashboardDto,
): DashboardData => {
  return {
    summary: [
      { title: 'Total Messages', value: dto?.messageCount },
      {
        title: 'Unread Messages',
        value: dto?.unreadMessageCount,
        drillDownKey: 'unread',
      },
      {
        title: 'Inbox Messages',
        value: dto?.inboxMessageCount,
        drillDownKey: 'inbox',
      },
      {
        title: 'Sent Messages',
        value: dto?.sentMessageCount,
        drillDownKey: 'sent',
      },
      {
        title: 'Archived Messages',
        value: dto?.archivedMessageCount,
        drillDownKey: 'archived',
      },
      {
        title: 'Emails Older Than 10 Years',
        value: dto?.emailsOlderThan10Years,
        drillDownKey: 'olderThan10Years',
      },
      {
        title: 'Emails Older Than 5 Years',
        value: dto?.emailsOlderThan5Years,
        drillDownKey: 'olderThan5Years',
      },
      {
        title: 'Emails Older Than 3 Years',
        value: dto?.emailsOlderThan3Years,
        drillDownKey: 'olderThan3Years',
      },
      {
        title: 'Emails Older Than 1 Year',
        value: dto?.emailsOlderThan1Year,
        drillDownKey: 'olderThan1Year',
      },
      {
        title: 'Emails Older Than 6 Months',
        value: dto?.emailsOlderThan6Months,
        drillDownKey: 'olderThan6Months',
      },
      {
        title: 'Emails Older Than 3 Months',
        value: dto?.emailsOlderThan3Months,
        drillDownKey: 'olderThan3Months',
      },
      {
        title: 'Emails Older Than 1 Month',
        value: dto?.emailsOlderThan1Month,
        drillDownKey: 'olderThan1Month',
      },
    ],
    inboxCountWarning:
      dto.inboxMessageCount + dto.archivedMessageCount + dto.sentMessageCount >
      dto.messageCount,
    topTenSenders: dto?.topTenSenderCount.map((sender) => ({
      title: sender.sender,
      value: sender.count,
      drillDownKey: 'sender:' + sender.sender,
    })),
    topTenSenderDomains: dto?.topTenSenderDomainCount.map((sender) => ({
      title: sender.sender,
      value: sender.count,
      drillDownKey: 'domain:' + sender.sender,
    })),
    topTenLabels: dto?.topTenLabelsCount.map((label) => ({
      title: label.labelId,
      value: label.count,
      drillDownKey: 'label:' + label.labelId,
    })),
  };
};
