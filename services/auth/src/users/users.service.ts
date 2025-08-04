import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { UpdateUserDto, PaginationDto } from '@ngear/shared';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { passwordHash, ...result } = user;
    return result as User;
  }

  async findByIdAndTenant(id: string, tenantId: string): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id, tenantId } 
    });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { passwordHash, ...result } = user;
    return result as User;
  }

  async findByEmail(email: string, tenantId?: string): Promise<User | null> {
    const where = tenantId ? { email, tenantId } : { email };
    return this.userRepository.findOne({ where });
  }

  async findByTenant(tenantId: string, paginationDto: PaginationDto) {
    const { page = 1, limit = 20 } = paginationDto;
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepository.findAndCount({
      where: { tenantId },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'phoneNumber',
        'isActive',
        'isEmailVerified',
        'isPhoneVerified',
        'lastLoginAt',
        'roles',
        'createdAt',
        'updatedAt',
      ],
    });

    return {
      data: users,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    
    await this.userRepository.update(id, {
      ...updateUserDto,
      updatedAt: new Date(),
      version: user.version + 1,
    });

    return this.findById(id);
  }

  async updateByTenant(id: string, tenantId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findByIdAndTenant(id, tenantId);
    
    await this.userRepository.update(
      { id, tenantId },
      {
        ...updateUserDto,
        updatedAt: new Date(),
        version: user.version + 1,
      },
    );

    return this.findByIdAndTenant(id, tenantId);
  }

  async deactivate(id: string, tenantId: string): Promise<void> {
    await this.userRepository.update(
      { id, tenantId },
      { isActive: false, updatedAt: new Date() },
    );
  }

  async activate(id: string, tenantId: string): Promise<void> {
    await this.userRepository.update(
      { id, tenantId },
      { isActive: true, updatedAt: new Date() },
    );
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.userRepository.update(id, {
      lastLoginAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async incrementFailedAttempts(id: string): Promise<void> {
    await this.userRepository.increment({ id }, 'failedLoginAttempts', 1);
  }

  async resetFailedAttempts(id: string): Promise<void> {
    await this.userRepository.update(id, {
      failedLoginAttempts: 0,
      lockedUntil: null,
      updatedAt: new Date(),
    });
  }

  async lockUser(id: string, lockUntil: Date): Promise<void> {
    await this.userRepository.update(id, {
      lockedUntil: lockUntil,
      updatedAt: new Date(),
    });
  }
}