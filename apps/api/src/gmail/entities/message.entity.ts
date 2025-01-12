import {
  Entity,
  Column,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectId,
} from 'typeorm';
@Entity({ name: 'messages' })
export class Message {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: string;

  @Column()
  messageId: string;

  @Column()
  threadId: string;

  @Column()
  snippet: string;

  @Column()
  historyId: string;

  @Column()
  internalDate: string;

  @Column()
  labelIds: string[];

  @Column()
  payload: MessagePart;

  @Column()
  sizeEstimate: number;

  @Column()
  raw: string;
}

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

export class MessageList {
  messages: Message[];
  nextPageToken: string;

  resultSizeEstimate: number;
}
