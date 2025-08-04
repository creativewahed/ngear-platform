import { Injectable } from '@nestjs/common';
import { db } from '@ngear/database';

// Temporary utility functions
class TempUtils {
  static createSuccessResponse<T>(data: T, meta?: any): any {
    return {
      success: true,
      data,
      meta,
    };
  }
}

@Injectable()
export class UserService {
  async getCurrentUser(user: any) {
    const fullUser = await db.getUserById(user.id);
    if (!fullUser) {
      throw new Error('User not found');
    }
    const { password, ...sanitizedUser } = fullUser as any;
    
    return TempUtils.createSuccessResponse({
      user: sanitizedUser,
    });
  }

  async getUserWallet(user: any) {
    const wallet = await db.getWalletByUser(user.id);
    
    return TempUtils.createSuccessResponse({
      wallet,
    });
  }
}