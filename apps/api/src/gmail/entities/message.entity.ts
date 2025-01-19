import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

export class MessagePart {
  @Column()
  partId: string;

  @Column()
  mimeType: string;

  @Column()
  filename: string;

  @Column()
  headers: any;

  @Column()
  body: any;

  @Column()
  parts: MessagePart[];
}

export class Address {
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  domain: string;
  @Column()
  rawAddress: string;
}

@Entity({ name: 'messages' })
export class Message {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: string;

  @Column()
  messageId: string;

  @Column()
  threadId?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Column((type) => Address)
  from?: Address;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Column((type) => Address)
  to?: Address;

  @Column()
  date: Date;

  @Column()
  subject?: string;

  @Column()
  snippet?: string;

  @Column()
  body?: string;

  @Column()
  list_unsubscribe?: string;

  @Column()
  historyId?: string;

  @Column()
  internalDate?: string;

  @Column()
  labelIds?: string[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Column((type) => MessagePart)
  payload?: MessagePart;

  @Column()
  sizeEstimate?: number;

  @Column()
  json?: string;
}

export class MessageList {
  messages: Message[];
  nextPageToken: string;

  resultSizeEstimate: number;
}
