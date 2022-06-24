import { Controller, Get, Request, Post, UseGuards, Body, Res, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import User from './users/user.entity';
import CreateUserDto from './users/dto/createUser.dto';
import { UsersService } from './users/users.service';


@Controller()
export class AppController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/register')
  async register(@Res() res, @Body() createUserDto: CreateUserDto) {
     const newUser = await this.userService.createUser(createUserDto);
     return res.status(HttpStatus.OK).json({
      message: "User was created successfully!",
      user: newUser
  })
  }
}