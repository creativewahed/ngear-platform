import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { EncryptionUtils } from '@ngear/shared';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    // This would typically inject a user service
    // For now, this is a placeholder implementation
    
    // const user = await this.userService.validateUser(email, password);
    // if (!user) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }
    // return user;
    
    throw new UnauthorizedException('Local strategy not fully implemented');
  }
}