import { EncryptionUtils } from '@ngear/shared';

describe('EncryptionUtils', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'testpassword123';
      const hash = await EncryptionUtils.hashPassword(password);
      
      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(50);
    });
  });

  describe('comparePassword', () => {
    it('should compare password correctly', async () => {
      const password = 'testpassword123';
      const hash = await EncryptionUtils.hashPassword(password);
      
      const isValid = await EncryptionUtils.comparePassword(password, hash);
      expect(isValid).toBe(true);
      
      const isInvalid = await EncryptionUtils.comparePassword('wrongpassword', hash);
      expect(isInvalid).toBe(false);
    });
  });

  describe('generateUUID', () => {
    it('should generate a valid UUID', () => {
      const uuid = EncryptionUtils.generateUUID();
      expect(uuid).toBeDefined();
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    it('should generate unique UUIDs', () => {
      const uuid1 = EncryptionUtils.generateUUID();
      const uuid2 = EncryptionUtils.generateUUID();
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe('generateRandomString', () => {
    it('should generate random string of specified length', () => {
      const length = 16;
      const randomString = EncryptionUtils.generateRandomString(length);
      
      expect(randomString).toBeDefined();
      expect(randomString.length).toBe(length * 2); // hex encoding doubles the length
    });
  });

  describe('generateApiKey', () => {
    it('should generate a valid API key', () => {
      const apiKey = EncryptionUtils.generateApiKey();
      
      expect(apiKey).toBeDefined();
      expect(apiKey).toMatch(/^ngear_[A-Za-z0-9_-]+$/);
    });
  });
});