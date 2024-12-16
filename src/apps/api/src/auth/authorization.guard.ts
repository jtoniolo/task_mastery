import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntity, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ENTITY_AUTH_KEY } from './entity-auth.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly logger = new Logger(AuthorizationGuard.name);

  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(User) private readonly userRepository: Repository<User>
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

    // Get the entity name and the owner id property from the metadata
    const metadata: { entityName: string; ownerIdProperty: string } =
      this.reflector.get(ENTITY_AUTH_KEY, context.getHandler());

    // if the metadata is not set, we'll assume that the user is not authorized
    // using the explicit grant vs explicit deny principle will prevent accidental access to resources
    // by means of developer oversight
    if (!metadata) {
      this.logger.warn(`Unauthorized access attempt by user ${userId}`);
      return false;
    }

    let resource: BaseEntity;

    // Obtain the resource based on the entity name
    // The number of repositories is expected grow as the number of entities increases,
    // so we'll keep the swirch pattern for now
    switch (metadata.entityName) {
      case 'None': // This is a special case for entities and requests that don't require authorization
        return true;
      case User.name:
        resource = await this.userRepository.findOne({
          where: { id: resourceId },
        });
        break;
      default:
        this.logger.warn(`Unknown entity ${metadata.entityName}`);
        return false;
    }

    // Check if the resource is owned by the user
    if (resource?.[metadata.ownerIdProperty] !== userId) {
      this.logger.warn(
        `Unauthorized access attempt by user ${userId} to resource ${resourceId}`
      );
      return false;
    }

    return true;
  }
}
