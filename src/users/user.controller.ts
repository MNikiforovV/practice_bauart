import { Controller, Get, Request, Post, UseGuards, Body, Res, Req, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import RoleGuard from './roles/role.guard';
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
    const projects = await this.userService.getSubscribersProjects(req.user);
    
    return res.json({projects: projects })
  }
}