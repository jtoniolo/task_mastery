import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly logger = new Logger(AuthorizationGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      this.logger.warn(`Unauthorized access attempt: No user found in request`);
      throw new UnauthorizedException('Please log in to continue');
    }

    const { userId } = request.params;
    if (userId && userId !== user.id) {
      this.logger.warn(`Unauthorized access attempt by user ${user.id} to resource owned by user ${userId}`);
      throw new UnauthorizedException('You do not have permission to access this resource');
    }

    return true;
  }
}
