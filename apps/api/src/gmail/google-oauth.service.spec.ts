import { Test, TestingModule } from '@nestjs/testing';
import { GoogleOauthService } from './google-oauth.service';
import { UserService } from '../users/user.service';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

describe('GoogleOauthService', () => {
  let service: GoogleOauthService;
  const userService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleOauthService, ConfigService, UserService, Logger],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: (name) => {
          return name;
        },
      })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    service = module.get<GoogleOauthService>(GoogleOauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
