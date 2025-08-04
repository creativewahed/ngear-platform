import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../middleware/auth.guard';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  async getCurrentUser(@Request() req: any) {
    return this.userService.getCurrentUser(req.user);
  }

  @Get('wallet')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user wallet information' })
  async getUserWallet(@Request() req: any) {
    return this.userService.getUserWallet(req.user);
  }
}