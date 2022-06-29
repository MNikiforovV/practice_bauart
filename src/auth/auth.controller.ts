import { Controller, Get, Request, Post, UseGuards, Body, Res, Req, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { AuthService } from './auth.service';
import User from '../users/user.entity';
import { Response } from 'express';
import CreateUserDto from '../users/dto/createUser.dto';
import { UsersService } from '../users/users.service';
import LoginUserDto from '../users/dto/loginUser.dto';
import RequestWithUser from './requestWithUser.interface';


@Controller('auth/')
export class AppController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginUserDto, @Request() req: RequestWithUser, @Res() res: Response) {
    const {user} = req;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return res.send(req.user);
    // return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Res() res, @Body() createUserDto: CreateUserDto) {
     const newUser = await this.userService.createUser(createUserDto);
     return res.status(HttpStatus.OK).json({
      message: "User was created successfully!",
      user: newUser
  })
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return res.sendStatus(200);
  }
}
