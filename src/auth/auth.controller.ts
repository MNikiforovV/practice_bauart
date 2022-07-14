import { Controller, Get, Request, Post, UseGuards, Body, Res, Req, HttpCode } from '@nestjs/common';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import CreateUserDto from '../users/dto/createUser.dto';
import { UsersService } from '../users/users.service';
import LoginUserDto from '../users/dto/loginUser.dto';
import RequestWithUser from './requestWithUser.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import JwtRefreshGuard from './jwt/jwt-refresh.guard';
import JwtAuthGuard from './jwt/jwt-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Loggin in of new user' })
  @Post('login')
  async login(
    @Body() dto: LoginUserDto,
    @Request() req: RequestWithUser,
    @Res() res: Response,
  ) {
    return await this.authService.login(dto, res);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() request: RequestWithUser, @Res() res) {
    const accessTokenCookie =
      await this.authService.getCookieWithJwtAccessToken(request.user.id);
    request.res.setHeader('Set-Cookie', accessTokenCookie);

    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Loggin out of new user' })
  @Post('logout')
  async logOut(@Req() request: RequestWithUser) {
    await this.userService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
  }

  @ApiOperation({ summary: 'Creating new user' })
  @Post('register')
  async register(@Res() res, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return res.json(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Checking if the user is logged in' })
  @Get('isloggedin')
  isLoggedIn() {
    return true;
  }
}
