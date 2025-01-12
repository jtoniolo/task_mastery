import { gmail_v1 } from '@googleapis/gmail';
import { Message, MessageList } from './entities/message.entity';

/**
 * This is a wrapper for the Gmail API
 */
export class GmailClient {
  private readonly client: gmail_v1.Gmail;
  constructor(auth: string) {
    this.client = new gmail_v1.Gmail({ auth });
  }

  async listEmail(): Promise<MessageList> {
    const response = await this.client.users.messages.list({});
    const messages =
      response.data.messages?.map((message) => {
        return {
          messageId: message.id,
          threadId: message.threadId,
          snippet: message.snippet,
          historyId: message.historyId,
          internalDate: message.internalDate,
          labelIds: message.labelIds,
          payload: message.payload,
          sizeEstimate: message.sizeEstimate,
          raw: message.raw,
        } as Message;
      }) || [];
    return {
      nextPageToken: response.data.nextPageToken,
      resultSizeEstimate: response.data.resultSizeEstimate,
      messages,
    };
  }
}
