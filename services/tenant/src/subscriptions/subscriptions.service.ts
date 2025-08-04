import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TenantSubscription } from '../entities/tenant-subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(TenantSubscription)
    private readonly subscriptionRepository: Repository<TenantSubscription>,
  ) {}

  async findAll() {
    return this.subscriptionRepository.find({
      relations: ['tenant'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    return this.subscriptionRepository.findOne({
      where: { id },
      relations: ['tenant'],
    });
  }

  async create(createSubscriptionDto: any) {
    const subscription = this.subscriptionRepository.create(createSubscriptionDto);
    return this.subscriptionRepository.save(subscription);
  }

  async update(id: string, updateSubscriptionDto: any) {
    await this.subscriptionRepository.update(id, updateSubscriptionDto);
    return this.findOne(id);
  }

  async cancel(id: string) {
    await this.subscriptionRepository.update(id, {
      status: 'cancelled',
      cancelledAt: new Date(),
    });
    return this.findOne(id);
  }
}