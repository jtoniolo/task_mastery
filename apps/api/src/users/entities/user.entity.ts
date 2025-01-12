import {
  Entity,
  Column,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectId,
} from 'typeorm';
@Entity({ name: 'users' })
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  @UpdateDateColumn()
  lastLogin: Date;
}
