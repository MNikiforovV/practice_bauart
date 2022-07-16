import { Controller, Get, Request, Post, UseGuards, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';


@Controller()
export class AppController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  //хэллоу ворлд типа

}