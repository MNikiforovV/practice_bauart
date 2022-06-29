import { Controller, Get, Request, Post, UseGuards, Body, Res, Req, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './auth/strategy/local-auth.guard';
import { AuthService } from './auth/auth.service';
import User from './users/user.entity';
import { Response } from 'express';
import CreateUserDto from './users/dto/createUser.dto';
import { UsersService } from './users/users.service';
import LoginUserDto from './users/dto/loginUser.dto';
import RequestWithUser from './auth/requestWithUser.interface';


@Controller()
export class AppController {
  constructor(private authService: AuthService, private userService: UsersService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('')
  index(@Request() req) {
    return req.user;
  }
}