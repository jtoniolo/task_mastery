import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): string {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return Array.isArray(ip) ? ip[0] : ip;
  }
}
