import { Controller, Get, Logger, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @ApiOkResponse({
    type: UserDto,
  })
  @Get('profile')
  async getProfile(@Request() req): Promise<UserDto> {
    this.logger.log('User profile requested', JSON.stringify(req.user));
    return this.userService.findById(req.user.id);
  }
}
