import { ApiProperty } from '@nestjs/swagger';
export class SenderCountDto {
  /**
   * The sender's email address.
   */
  @ApiProperty()
  sender?: string;

  /**
   * The count of emails sent by the sender.
   */
  @ApiProperty()
  count?: number;
}

export class LabelCountDto {
  /**
   * The label's name.
   */
  @ApiProperty()
  labelId?: string;

  /**
   * The count of emails with the label.
   */
  @ApiProperty()
  count?: number;
}

export class CountByDateRangeDto {
  /**
   * The groupings name.
   * @ex 'Older than 5 years'
   */
  @ApiProperty()
  name: string;

  /**
   * The start date of the date
   */
  @ApiProperty()
  startDate: string;

  /**
   * The end date of the date
   */
  @ApiProperty()
  endDate: string;

  /**
   * The count of emails in the date range.
   */
  @ApiProperty()
  count: number;
}

export class DashboardDto {
  /**
   * The user's email count.
   */
  @ApiProperty()
  messageCount: number;

  /**
   * The user's unread email count.
   */
  @ApiProperty()
  unreadMessageCount?: number;
  /**
   * The user's inbox email count.
   */
  @ApiProperty()
  inboxMessageCount?: number;

  /**
   * The user's sent email count.
   */
  @ApiProperty()
  sentMessageCount?: number;

  /**
   * The user's archived email count.
   */
  @ApiProperty()
  archivedMessageCount?: number;

  /**
   * The user's top ten email senders.
   */
  @ApiProperty({ type: [SenderCountDto] })
  topTenSenderCount: SenderCountDto[];

  /**
   * The user's top ten email sender domains.
   */
  @ApiProperty({ type: [SenderCountDto] })
  topTenSenderDomainCount?: SenderCountDto[];

  /**
   * The user's top ten email labels.
   */
  @ApiProperty({ type: [LabelCountDto] })
  topTenLabelsCount: LabelCountDto[];

  /**
   * Count of emails older than 10 years.
   */
  @ApiProperty()
  emailsOlderThan10Years?: number;

  /**
   * Count of emails older than 5 years, but less than 10 years.
   */
  @ApiProperty()
  emailsOlderThan5Years?: number;

  /**
   * Count of emails older than 3 years, but less than 5 years.
   */
  @ApiProperty()
  emailsOlderThan3Years?: number;

  /**
   * Count of emails older than 1 year, but less than 3 years.
   */
  @ApiProperty()
  emailsOlderThan1Year?: number;

  /**
   * Count of emails older than 6 months, but less than 1 year.
   */
  @ApiProperty()
  emailsOlderThan6Months?: number;

  /**
   * Count of emails older than 3 months, but less than 6 months.
   */
  @ApiProperty()
  emailsOlderThan3Months?: number;

  /**
   * Count of emails older than 1 month, but less than 3 months.
   */
  @ApiProperty()
  emailsOlderThan1Month?: number;
}
