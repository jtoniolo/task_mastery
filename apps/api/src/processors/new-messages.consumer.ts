import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { OAuth2Client } from 'google-auth-library';
import * as gmail from '@googleapis/gmail';
import { GmailService } from 'gmail/gmail.service';
import { GoogleOauthService } from 'gmail/google-oauth.service';
import { NewMessagesRequest } from 'queue/models/new-messages.request';
import { QUEUE_NEW_MESSAGES } from 'queue/queue.constants';
import { UserService } from 'users/user.service';
import { GmailClient } from 'gmail/gmail.client';
import { Message } from 'gmail/entities/message.entity';

@Processor(QUEUE_NEW_MESSAGES)
/**
 * The NewMessagesConsumer class is responsible for processing new messages from Gmail.
 * It extends the WorkerHost class and utilizes various services to authenticate, retrieve,
 * and process Gmail messages.
 */
export class NewMessagesConsumer extends WorkerHost {
  constructor(
    @InjectQueue(QUEUE_NEW_MESSAGES) private readonly newMessagesQueue: Queue,
    private readonly userService: UserService,
    private readonly googleAuth: GoogleOauthService,
    private readonly gmailService: GmailService,
    private readonly logger: Logger,
  ) {
    super();
  }

  /**
   * Retrieves an authenticated Gmail client based on the provided request.
   *
   * @param request - The request containing access tokens or user ID for authentication.
   * @returns A promise that resolves to an authenticated GmailClient instance.
   * @throws An error if no credentials are provided.
   */
  private async getGmailClient(
    request: NewMessagesRequest,
  ): Promise<GmailClient> {
    let oauth2Client: OAuth2Client;
    if (request.access_token && request.refresh_token) {
      oauth2Client = this.googleAuth.getClient({
        access_token: request.access_token,
        refresh_token: request.refresh_token,
        userId: request.userId,
      });
    } else if (request.userId) {
      const credentials = await this.userService.getCredentials(request.userId);
      oauth2Client = this.googleAuth.getClient(credentials);
    } else {
      this.logger.error('No credentials provided');
      throw new Error('No credentials provided');
    }
    return new GmailClient(oauth2Client);
  }

  /**
   * Finds the body of a Gmail message.
   *
   * @param message - The Gmail message to search for a body.
   * @returns The body of the Gmail message.
   */
  private findBody(message: gmail.gmail_v1.Schema$Message): string {
    let body = '';
    if (
      message.payload?.mimeType === 'text/html' &&
      message.payload?.body?.data
    ) {
      body = message.payload.body.data;
    } else if (
      ['multipart/mixed', 'multipart/alternative'].indexOf(
        message.payload?.mimeType,
      ) > -1
    ) {
      for (const part of message.payload.parts) {
        body = this.findBodyInPart(part);
        if (body) {
          break;
        }
      }
    }
    return body;
  }

  /**
   * Finds the body of a Gmail message part.
   *
   * @param part - The Gmail message part to search for a body.
   * @returns The body of the Gmail message part.
   */
  private findBodyInPart(part: gmail.gmail_v1.Schema$MessagePart): string {
    let body = '';
    if (part.mimeType === 'text/html' && part.body?.data) {
      body = part.body.data;
    } else if (
      ['multipart/mixed', 'multipart/alternative'].indexOf(part.mimeType) > -1
    ) {
      body = this.findBodyInPart(part.parts[0]);
    }
    return body;
  }

  /**
   * Merges the full details of a Gmail message into a local message.
   *
   * @param message - The local message to merge the details into.
   * @param gmailMessage - The Gmail message to merge the details from.
   * @returns The merged message.
   */
  private mergeFull(
    message: Message,
    gmailMessage: gmail.gmail_v1.Schema$Message,
  ): Message {
    message.snippet = gmailMessage.snippet;
    message.labelIds = gmailMessage.labelIds;
    message.threadId = gmailMessage.threadId;
    message.sizeEstimate = gmailMessage.sizeEstimate;
    message.from = gmailMessage.payload?.headers?.find(
      (header) => header.name === 'From',
    )?.value;
    message.to = gmailMessage.payload?.headers?.find(
      (header) => header.name === 'To',
    )?.value;
    message.subject = gmailMessage.payload?.headers?.find(
      (header) => header.name === 'Subject',
    )?.value;
    //Base64 encoded string
    message.body = this.findBody(gmailMessage);
    //TODO: Remove after testing
    //message.json = JSON.stringify(gmailMessage);
    return message;
  }

  /**
   * Merges the metadata of a Gmail message into a local message.
   *
   * @param message - The local message to merge the metadata into.
   * @param gmailMessage - The Gmail message to merge the metadata from.
   * @returns The merged message.
   */
  private mergeMetadata(
    message: Message,
    gmailMessage: gmail.gmail_v1.Schema$Message,
  ): Message {
    message.snippet = gmailMessage.snippet;
    message.labelIds = gmailMessage.labelIds;
    message.threadId = gmailMessage.threadId;
    message.sizeEstimate = gmailMessage.sizeEstimate;
    message.from = gmailMessage.payload?.headers?.find(
      (header) => header.name === 'From',
    )?.value;
    message.to = gmailMessage.payload?.headers?.find(
      (header) => header.name === 'To',
    )?.value;
    message.subject = gmailMessage.payload?.headers?.find(
      (header) => header.name === 'Subject',
    )?.value;
    message.list_unsubscribe = gmailMessage.payload?.headers?.find(
      (header) => header.name === 'List-Unsubscribe',
    )?.value;
    const msgDate = gmailMessage.payload?.headers?.find(
      (header) => header.name === 'Date',
    )?.value;
    if (msgDate) {
      const parsedDate = new Date(msgDate);
      if (!isNaN(parsedDate.getTime())) {
        message.date = parsedDate;
      } else {
        this.logger.error(`Invalid date format: ${msgDate}`);
      }
    }
    //TODO: Remove after testing
    //message.json = JSON.stringify(gmailMessage); // Store the full message for testing and experimentation (docs are lacking)
    return message;
  }

  /**
   * Processes a job to retrieve new messages from Gmail.
   *
   * @param job - The job containing the request to retrieve new messages.
   */
  async process(job: Job<NewMessagesRequest, any, string>) {
    try {
      this.logger.log(
        `Processing (${job.data.messageIds.length}) new messages`,
      );
      const req = job.data;
      this.logger.log(`Retrieving messages`);
      const messages = await this.gmailService.getMessagesById(
        job.data.messageIds,
        req.userId,
      );
      this.logger.log(`Retrieved ${messages.length} messages`);

      const client = await this.getGmailClient(req);

      for (const message of messages) {
        const gmailMessage = await client.getMessage(
          message.messageId,
          req.format,
        );
        if (req.format === 'full') {
          this.mergeFull(message, gmailMessage);
        } else if (req.format === 'metadata') {
          this.mergeMetadata(message, gmailMessage);
        }
      }

      this.logger.log(`saving ${messages.length} messages`);

      await this.gmailService.saveEmailsAsync(messages, req.userId);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
