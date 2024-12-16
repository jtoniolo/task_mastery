import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext) {
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

    return super.canActivate(context);
  }
}
