import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    
    const { method, url, headers, ip } = request;
    const userAgent = headers['user-agent'] || '';
    const correlationId = headers['x-correlation-id'] || this.generateCorrelationId();
    
    // Add correlation ID to request for downstream services
    request.headers['x-correlation-id'] = correlationId;
    
    const startTime = Date.now();
    
    this.logger.log(
      `Incoming ${method} ${url} from ${ip} - Correlation ID: ${correlationId}`,
    );

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - startTime;
          const { statusCode } = response;
          
          this.logger.log(
            `Outgoing ${method} ${url} ${statusCode} - ${duration}ms - Correlation ID: ${correlationId}`,
          );
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          const statusCode = error.status || 500;
          
          this.logger.error(
            `Error ${method} ${url} ${statusCode} - ${duration}ms - Correlation ID: ${correlationId}`,
            error.stack,
          );
        },
      }),
    );
  }

  private generateCorrelationId(): string {
    return `gw-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}