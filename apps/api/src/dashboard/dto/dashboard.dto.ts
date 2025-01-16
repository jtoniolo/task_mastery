import { ApiProperty } from '@nestjs/swagger';
export class DashboardDto {
  /**
   * The user's email count.
   */

  @ApiProperty()
  messageCount?: number;
}
