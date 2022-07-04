import { Controller, Get, Request, Post, UseGuards, Body, Res, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from './auth/strategy/local-auth.guard';
import { AuthService } from './auth/auth.service';
import CreateUserDto from './users/dto/createUser.dto';
import { UsersService } from './users/users.service';
import LoginUserDto from './users/dto/loginUser.dto';
import { Response } from 'express';
import RequestWithUser from './auth/requestWithUser.interface';


@Controller()
export class AppController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  //хэллоу ворлд типа

}