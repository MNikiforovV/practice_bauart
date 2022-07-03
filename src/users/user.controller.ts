import { Controller, Get, Request, Post, UseGuards, Body, Res, Req, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('user/')
@ApiTags('user')
export class UserController {
  constructor(private authService: AuthService, private userService: UsersService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req, @Res() res) {
    return res.json({name: req.user.name, surname: req.user.surname, email: req.user.email})
  }
}