import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly logger = new Logger(AuthorizationGuard.name);

  constructor(
    private reflector: Reflector,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      this.logger.warn(`Unauthorized access attempt by unknown user`);
      return false;
    }

    const userId = user.id;
    const resourceId = request.params.id;

    const resource = await this.userRepository.findOne({ where: { id: resourceId, userId } });

    if (!resource) {
      this.logger.warn(`Unauthorized access attempt by user ${userId} to resource ${resourceId}`);
      return false;
    }

    return true;
  }
}
