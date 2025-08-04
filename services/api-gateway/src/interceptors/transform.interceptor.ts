import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
    timestamp: string;
    path: string;
    correlationId?: string;
  };
  meta?: {
    timestamp: string;
    correlationId?: string;
    service: string;
    version: string;
  };
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const correlationId = request.headers['x-correlation-id'] as string;

    return next.handle().pipe(
      map((data) => {
        // If the response is already in the expected format, return as-is
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        // Transform the response to standard API format
        return {
          success: true,
          data,
          meta: {
            timestamp: new Date().toISOString(),
            correlationId,
            service: 'api-gateway',
            version: '1.0.0',
          },
        };
      }),
    );
  }
}