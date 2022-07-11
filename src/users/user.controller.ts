import { Controller, Get, Request, Post, UseGuards, Body, Res, Req, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import RoleCreatorGuard from './roles/role-creator-admin.guard';
import Role from './roles/role.enum';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import JwtRefreshGuard from 'src/auth/jwt/jwt-refresh.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';

@Controller('user')
// @UseGuards(RoleGuard(Role.Admin)) // Доступно только пользователю с ролью админа
@ApiTags('user') 
export class UserController {
  constructor(private authService: AuthService, private userService: UsersService) {}
  
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'User profile' })
  @Get('profile')
  async getProfile(@Request() req: RequestWithUser, @Res() res) {
    const authorProjects = await this.userService.getProjectsByUser(req.user);
    const subscriberProjects = await this.userService.getSubscribersProjects(req.user);

    return {authorProjects,  subscriberProjects}
  } 

  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Get user' })
  @Get('user')
  async getUser(@Request() req: RequestWithUser, @Res() res) {
    const user = req.user
    return user
  }

  @UseGuards(JwtAuthGuard)
  @Get('cart')
  async getFundraisings(@Req() req: RequestWithUser){
    return await this.userService.getFundraisingsByUser(req.user)
  }
}