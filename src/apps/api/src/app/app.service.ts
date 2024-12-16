import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getData(userId: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      this.logger.warn(`Unauthorized access attempt by user ${userId}`);
      throw new UnauthorizedException('You do not have permission to access this resource');
    }

    const data = { message: 'Hello API' };
    return data;
  }
}
