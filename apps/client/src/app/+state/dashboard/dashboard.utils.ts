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
        queryKey: 'unread',
      },
      {
        title: 'Inbox Messages',
        value: dto?.inboxMessageCount,
        queryKey: 'inbox',
      },
      {
        title: 'Sent Messages',
        value: dto?.sentMessageCount,
        queryKey: 'sent',
      },
      {
        title: 'Archived Messages',
        value: dto?.archivedMessageCount,
        queryKey: 'archived',
      },
      {
        title: 'Emails Older Than 10 Years',
        value: dto?.emailsOlderThan10Years,
        queryKey: 'olderThan10Years',
      },
      {
        title: 'Emails Older Than 5 Years',
        value: dto?.emailsOlderThan5Years,
        queryKey: 'olderThan5Years',
      },
      {
        title: 'Emails Older Than 3 Years',
        value: dto?.emailsOlderThan3Years,
        queryKey: 'olderThan3Years',
      },
      {
        title: 'Emails Older Than 1 Year',
        value: dto?.emailsOlderThan1Year,
        queryKey: 'olderThan1Year',
      },
      {
        title: 'Emails Older Than 6 Months',
        value: dto?.emailsOlderThan6Months,
        queryKey: 'olderThan6Months',
      },
      {
        title: 'Emails Older Than 3 Months',
        value: dto?.emailsOlderThan3Months,
        queryKey: 'olderThan3Months',
      },
      {
        title: 'Emails Older Than 1 Month',
        value: dto?.emailsOlderThan1Month,
        queryKey: 'olderThan1Month',
      },
    ],
    inboxCountWarning:
      dto.inboxMessageCount + dto.archivedMessageCount + dto.sentMessageCount >
      dto.messageCount,
    topTenSenders: dto?.topTenSenderCount.map((sender) => ({
      title: sender.sender,
      value: sender.count,
      queryKey: 'sender:' + sender.sender,
    })),
    topTenSenderDomains: dto?.topTenSenderDomainCount.map((sender) => ({
      title: sender.sender,
      value: sender.count,
      queryKey: 'domain:' + sender.sender,
    })),
    topTenLabels: dto?.topTenLabelsCount.map((label) => ({
      title: label.labelId,
      value: label.count,
      queryKey: 'label:' + label.labelId,
    })),
  };
};
