import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { ObjectId } from 'mongodb';
import { plainToInstance } from 'class-transformer';

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
}
