export interface GmailEntity {
  labels: LabelEntity[];
}

export interface LabelEntity {
  _id: string;
  userId: string;
  labelId: string;
  name: string;
  type: string;
  messageListVisibility: string;
  labelListVisibility: string;
}
