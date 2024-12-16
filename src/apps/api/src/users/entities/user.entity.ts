import {
  Entity,
  Column,
  UpdateDateColumn,
  ObjectIdColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: string;

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
