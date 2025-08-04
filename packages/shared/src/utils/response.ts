import { APIResponse } from '@ngear/types';

export class ResponseUtils {
  static success<T>(data: T, metadata?: Record<string, any>): APIResponse<T> {
    return {
      success: true,
      data,
      metadata,
    };
  }

  static error(
    code: string,
    message: string,
    details?: any
  ): APIResponse {
    return {
      success: false,
      error: {
        code,
        message,
        details,
      },
    };
  }

  static validationError(errors: string[]): APIResponse {
    return this.error(
      'VALIDATION_ERROR',
      'Validation failed',
      { errors }
    );
  }

  static notFound(resource: string): APIResponse {
    return this.error(
      'NOT_FOUND',
      `${resource} not found`
    );
  }

  static unauthorized(message: string = 'Unauthorized'): APIResponse {
    return this.error(
      'UNAUTHORIZED',
      message
    );
  }

  static forbidden(message: string = 'Forbidden'): APIResponse {
    return this.error(
      'FORBIDDEN',
      message
    );
  }

  static internalError(message: string = 'Internal server error'): APIResponse {
    return this.error(
      'INTERNAL_ERROR',
      message
    );
  }

  static conflict(message: string): APIResponse {
    return this.error(
      'CONFLICT',
      message
    );
  }

  static tooManyRequests(message: string = 'Too many requests'): APIResponse {
    return this.error(
      'TOO_MANY_REQUESTS',
      message
    );
  }
}