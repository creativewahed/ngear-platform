import { validate, ValidationError } from 'class-validator';
import { transform, plainToClass, ClassConstructor } from 'class-transformer';

export class ValidationUtils {
  static async validateDto<T extends object>(
    dto: ClassConstructor<T>,
    data: any
  ): Promise<{ isValid: boolean; errors: string[]; validData?: T }> {
    try {
      const instance = plainToClass(dto, data);
      const errors = await validate(instance);
      
      if (errors.length > 0) {
        const errorMessages = this.extractErrorMessages(errors);
        return { isValid: false, errors: errorMessages };
      }
      
      return { isValid: true, errors: [], validData: instance };
    } catch (error) {
      return { isValid: false, errors: ['Validation failed'] };
    }
  }

  static extractErrorMessages(errors: ValidationError[]): string[] {
    const messages: string[] = [];
    
    errors.forEach(error => {
      if (error.constraints) {
        Object.values(error.constraints).forEach(message => {
          messages.push(message);
        });
      }
      
      if (error.children && error.children.length > 0) {
        messages.push(...this.extractErrorMessages(error.children));
      }
    });
    
    return messages;
  }

  static isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isPhoneNumber(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  static isStrongPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }

  static sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }
}