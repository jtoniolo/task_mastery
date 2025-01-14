import { gmail_v1 } from '@googleapis/gmail';
import { Message, MessageList } from './entities/message.entity';
import { OAuth2Client } from 'google-auth-library';

/**
 * The GmailClient class is responsible for interacting with the Gmail API.
 */
export class GmailClient {
  private readonly client: gmail_v1.Gmail;
  constructor(auth: OAuth2Client) {
    this.client = new gmail_v1.Gmail({ auth });
  }

  /**
   * Lists the messages in the user's mailbox.
   * @param pageToken - The token for the next page of messages.
   * @returns The list of messages.
   */
  async listEmail(pageToken?: string): Promise<MessageList> {
    const response = await this.client.users.messages.list({
      userId: 'me',
      pageToken,
    });
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
        } as Message;
      }) || [];
    return {
      nextPageToken: response.data.nextPageToken,
      resultSizeEstimate: response.data.resultSizeEstimate,
      messages,
    };
  }

  /**
   * Gets a message by ID.
   * @param messageId - The ID of the message.
   * @param format - The format of the message.
   * @returns The message.
   */
  async getMessage(
    messageId: string,
    format: string = 'metadata',
  ): Promise<Message> {
    const response = await this.client.users.messages.get({
      userId: 'me',
      id: messageId,
      format: format,
    });
    return response.data as Message;
  }
}
