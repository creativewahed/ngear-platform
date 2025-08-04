import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto, ChangePasswordDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    const user = this.usersRepository.create({
      ...createUserDto,
      passwordHash: hashedPassword,
      permissions: createUserDto.permissions || [],
    });

    return this.usersRepository.save(user);
  }

  async findAll(tenantId?: string): Promise<User[]> {
    const query = this.usersRepository.createQueryBuilder('user');
    
    if (tenantId) {
      query.where('user.tenantId = :tenantId', { tenantId });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    const user = await this.findOne(id);

    const isValidPassword = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.passwordHash,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 12);
    user.passwordHash = hashedPassword;
    
    await this.usersRepository.save(user);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }

  async updateLoginInfo(id: string): Promise<void> {
    await this.usersRepository.update(id, {
      lastLogin: new Date(),
      loginAttempts: 0,
      lockedUntil: null,
    });
  }

  async incrementLoginAttempts(id: string): Promise<void> {
    const user = await this.findOne(id);
    const attempts = user.loginAttempts + 1;
    const lockedUntil = attempts >= 5 ? new Date(Date.now() + 30 * 60 * 1000) : null; // 30 minutes

    await this.usersRepository.update(id, {
      loginAttempts: attempts,
      lockedUntil,
    });
  }
}