import { ValidationUtils } from '@ngear/shared';

describe('ValidationUtils', () => {
  describe('isEmail', () => {
    it('should validate email correctly', () => {
      expect(ValidationUtils.isEmail('test@example.com')).toBe(true);
      expect(ValidationUtils.isEmail('invalid-email')).toBe(false);
      expect(ValidationUtils.isEmail('test@')).toBe(false);
    });
  });

  describe('isStrongPassword', () => {
    it('should validate strong password correctly', () => {
      expect(ValidationUtils.isStrongPassword('Password123!')).toBe(true);
      expect(ValidationUtils.isStrongPassword('weak')).toBe(false);
      expect(ValidationUtils.isStrongPassword('password123')).toBe(false);
      expect(ValidationUtils.isStrongPassword('PASSWORD123!')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should sanitize input correctly', () => {
      expect(ValidationUtils.sanitizeInput('  hello world  ')).toBe('hello world');
      expect(ValidationUtils.sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
    });
  });
});