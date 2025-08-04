import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

import { TenantApiKey } from '../entities/tenant-api-key.entity';

@Injectable()
export class ApiKeysService {
  constructor(
    @InjectRepository(TenantApiKey)
    private readonly apiKeyRepository: Repository<TenantApiKey>,
  ) {}

  async findAll() {
    return this.apiKeyRepository.find({
      relations: ['tenant'],
      order: { createdAt: 'DESC' },
      select: [
        'id',
        'tenantId',
        'name',
        'keyPrefix',
        'scopes',
        'rateLimit',
        'isActive',
        'expiresAt',
        'lastUsedAt',
        'usageCount',
        'metadata',
        'createdAt',
      ],
    });
  }

  async findOne(id: string) {
    return this.apiKeyRepository.findOne({
      where: { id },
      relations: ['tenant'],
      select: [
        'id',
        'tenantId',
        'name',
        'keyPrefix',
        'scopes',
        'rateLimit',
        'isActive',
        'expiresAt',
        'lastUsedAt',
        'usageCount',
        'metadata',
        'createdAt',
      ],
    });
  }

  async create(createApiKeyDto: any) {
    // Generate API key
    const key = this.generateApiKey();
    const keyHash = crypto.createHash('sha256').update(key).digest('hex');
    const keyPrefix = key.substring(0, 8);

    const apiKey = this.apiKeyRepository.create({
      ...createApiKeyDto,
      keyHash,
      keyPrefix,
    });

    const savedApiKey = await this.apiKeyRepository.save(apiKey);

    // Return the key only once (during creation)
    return {
      ...savedApiKey,
      key, // Full key is only returned during creation
    };
  }

  async update(id: string, updateApiKeyDto: any) {
    await this.apiKeyRepository.update(id, updateApiKeyDto);
    return this.findOne(id);
  }

  async revoke(id: string) {
    await this.apiKeyRepository.update(id, {
      isActive: false,
      deletedAt: new Date(),
    });
    return this.findOne(id);
  }

  async verifyApiKey(key: string): Promise<TenantApiKey | null> {
    const keyHash = crypto.createHash('sha256').update(key).digest('hex');
    
    const apiKey = await this.apiKeyRepository.findOne({
      where: { keyHash, isActive: true },
      relations: ['tenant'],
    });

    if (!apiKey || !apiKey.isValid) {
      return null;
    }

    // Update usage statistics
    await this.apiKeyRepository.update(apiKey.id, {
      lastUsedAt: new Date(),
      usageCount: apiKey.usageCount + 1,
    });

    return apiKey;
  }

  private generateApiKey(): string {
    // Generate a secure API key
    const prefix = 'ngear_';
    const randomBytes = crypto.randomBytes(32).toString('hex');
    return `${prefix}${randomBytes}`;
  }
}