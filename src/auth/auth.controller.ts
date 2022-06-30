import { Controller, Get, Request, Post, UseGuards, Body, Res, Req, HttpStatus, HttpCode } from '@nestjs/common';
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
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestWithUser, @Res() res: Response) {
    const {user} = req;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    console.log(cookie)
    res.cookie('Set-Cookie', cookie, {
      maxAge: 60000,
      httpOnly:true
    });
    user.password = undefined;
    return res.json(req.user);
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
