export interface NewMessagesRequest {
  userId?: string;
  access_token?: string;
  refresh_token?: string;
  messageIds: string[];
  format: 'minimal' | 'raw' | 'metadata' | 'full';
}
