import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { auth } from '@googleapis/oauth2';
import { OAuth2Client, OAuth2ClientOptions } from 'google-auth-library';
import { UserService } from 'users/user.service';

@Injectable()
export class GoogleOauthService {
  private readonly options: OAuth2ClientOptions;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {
    this.options = {
      clientId: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
      redirectUri: this.configService.get<string>('GOOGLE_CALLBACK_URL'),
    };
  }

  getClient(credentials: Credentials): OAuth2Client {
    const client = new auth.OAuth2(this.options);

    client.setCredentials({
      access_token: credentials.access_token,
      refresh_token: credentials.refresh_token,
    });
    client.on('tokens', async (tokens) => {
      this.logger.debug(`Received new tokens: `);
      credentials.access_token = tokens.access_token;
      credentials.refresh_token = tokens.refresh_token;
      await this.userService.updateTokens(credentials);
    });

    return client;
  }
}

export interface Credentials {
  access_token: string;
  refresh_token: string;
  userId: string;
}
