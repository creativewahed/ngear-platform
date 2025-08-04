import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class ValidationUtils {
  static async validateDto<T extends object>(
    dtoClass: new () => T,
    data: unknown,
  ): Promise<{ isValid: boolean; errors: Record<string, string[]> }> {
    const dto = plainToClass(dtoClass, data);
    const validationErrors = await validate(dto);

    if (validationErrors.length === 0) {
      return { isValid: true, errors: {} };
    }

    const errors = this.formatValidationErrors(validationErrors);
    return { isValid: false, errors };
  }

  private static formatValidationErrors(validationErrors: ValidationError[]): Record<string, string[]> {
    const errors: Record<string, string[]> = {};

    for (const error of validationErrors) {
      if (error.constraints) {
        errors[error.property] = Object.values(error.constraints);
      }

      if (error.children && error.children.length > 0) {
        const childErrors = this.formatValidationErrors(error.children);
        Object.assign(errors, childErrors);
      }
    }

    return errors;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  static sanitizeString(str: string): string {
    return str.trim().toLowerCase();
  }
}