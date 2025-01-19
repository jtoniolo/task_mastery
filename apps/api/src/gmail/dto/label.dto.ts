import { ApiProperty } from '@nestjs/swagger';
import {
  LabelType,
  LabelVisibility,
  LabelMessageVisibility,
} from '../entities/label.entity';

export class LabelDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  labelId: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: LabelType })
  type: LabelType;

  @ApiProperty({ enum: LabelMessageVisibility })
  messageListVisibility: LabelMessageVisibility;

  @ApiProperty({ enum: LabelVisibility })
  labelListVisibility: LabelVisibility;
}
