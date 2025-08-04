import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  protected async getTracker(req: Request): Promise<string> {
    // Use API key if present, otherwise fall back to IP
    const apiKey = req.headers['x-api-key'] as string;
    if (apiKey) {
      return `api-key:${apiKey}`;
    }

    // Use tenant ID if present for better rate limiting
    const tenantId = req.headers['x-tenant-id'] as string;
    if (tenantId) {
      return `tenant:${tenantId}:${req.ip}`;
    }

    return req.ip;
  }

  protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    
    // Skip rate limiting for health checks
    if (request.path.includes('/health')) {
      return true;
    }

    // Skip rate limiting for internal service calls
    const internalHeader = request.headers['x-internal-call'];
    if (internalHeader === 'true') {
      return true;
    }

    return false;
  }
}