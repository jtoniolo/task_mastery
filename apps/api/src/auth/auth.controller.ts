import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './google-oauth.guard';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @Public()
  @Get('google')
  @ApiFoundResponse({ description: 'Redirects to Google OAuth' })
  @UseGuards(GoogleOAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {
    /* This is empty because all the logic is handled by GoogleOAuthGuard and GoogleStrategy */
  }

  @Public()
  @Get('google/callback')
  @ApiFoundResponse({ description: "Redirects client's auth route" })
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);

    return res.redirect(process.env.CLIENT_URL + '/auth?access_token=' + token);
  }
}
