import { Controller, Get, Request, Post, UseGuards, Body, Res, Req, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';

@Controller('user/')
export class UserController {
  constructor(private authService: AuthService, private userService: UsersService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}