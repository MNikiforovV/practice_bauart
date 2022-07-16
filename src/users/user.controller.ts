import { Controller, Get, Request, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'User profile' })
  @Get('profile')
  async getProfile(@Request() req: RequestWithUser, @Res() res) {
    const authorProjects = await this.userService.getProjectsByUser(req.user);
    const subscriberProjects = await this.userService.getSubscribersProjects(
      req.user,
    );

    return res.json({ authorProjects, subscriberProjects });
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user' })
  @Get('user')
  async getUser(@Request() req: RequestWithUser, @Res() res) {
    const user = req.user;
    return res.json(user);
  }

  // Get-запрос для корзины, ищет все донаты конкретного пользователя вместе со сбором средств доната.
  @UseGuards(JwtAuthGuard)
  @Get('cart')
  async getFundraisings(@Req() req: RequestWithUser) {
    return await this.userService.getFundraisingsByUser(req.user);
  }
}
