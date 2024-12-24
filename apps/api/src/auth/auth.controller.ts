import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './google-oauth.guard';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @Get('google')
  @ApiFoundResponse({ description: 'Redirects to Google OAuth' })
  @UseGuards(GoogleOAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {
    /* This is empty because all the logic is handled by GoogleOAuthGuard */
  }

  @Get('google/callback')
  @ApiFoundResponse({ description: "Redirects client's auth route" })
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);

    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 2592000000,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    this.logger.log('redirect to: ' + process.env.CLIENT_URL + '/auth');
    console.log('redirect to: ' + process.env.CLIENT_URL + '/auth');
    return res.redirect(process.env.CLIENT_URL + '/auth?access_token=' + token);
  }
}
