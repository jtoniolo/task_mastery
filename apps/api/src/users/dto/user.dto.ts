import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  @ApiProperty()
  email: string;
  @Expose()
  @ApiProperty()
  username: string;
  @Expose()
  @ApiProperty()
  firstName: string;
  @Expose()
  @ApiProperty()
  lastName: string;
  @Expose()
  @ApiProperty()
  picture?: string;
  @Expose()
  @ApiProperty()
  lastLogin?: Date;
}
