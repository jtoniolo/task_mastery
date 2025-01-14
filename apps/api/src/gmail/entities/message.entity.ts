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

  @Column()
  snippet?: string;

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
  raw?: string;
}

export class MessageList {
  messages: Message[];
  nextPageToken: string;

  resultSizeEstimate: number;
}
