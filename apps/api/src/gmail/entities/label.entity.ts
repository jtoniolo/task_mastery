import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

export enum LabelType {
  system = 'system',
  user = 'user',
}

export enum LabelVisibility {
  labelShow = 'labelShow',
  labelShowIfUnread = 'labelShowIfUnread',
  hide = 'labelHide',
}

export enum LabelMessageVisibility {
  show = 'show',
  hide = 'hide',
}

//List of labels. Note that each label resource only contains an id, name, messageListVisibility, labelListVisibility, and type
@Entity({ name: 'labels' })
export class Label {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: string;

  @Column()
  labelId: string;

  @Column()
  name: string;

  @Column()
  type: LabelType;

  @Column()
  messageListVisibility: LabelMessageVisibility;

  @Column()
  labelListVisibility: LabelVisibility;
}
