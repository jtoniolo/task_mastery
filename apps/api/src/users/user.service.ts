import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { Credentials } from 'auth/google-oauth.service';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async findById(id: string): Promise<UserDto> {
    const _id = new ObjectId(id);
    if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId');
    const user = await this.userRepository.findOne({ where: { _id } });
    return plainToInstance(UserDto, user);
  }
  async getCredentials(id: string): Promise<Credentials> {
    const _id = new ObjectId(id);
    const user = await this.userRepository.findOne({ where: { _id } });
    return {
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
      userId: user._id.toHexString(),
    };
  }
  async updateTokens(credentials: Credentials): Promise<void> {
    const _id = new ObjectId(credentials.userId);
    await this.userRepository.update(
      { _id },
      {
        accessToken: credentials.access_token,
        refreshToken: credentials.refresh_token,
      },
    );
  }
}
