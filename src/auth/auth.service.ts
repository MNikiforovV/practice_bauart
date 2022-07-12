import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/bcrypt';
import LoginUserDto from 'src/users/dto/loginUser.dto';
import RequestWithUser from './requestWithUser.interface';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
      ) {}

  public async validateUser(email: string, pass: string) {
    const userCheck = await this.usersService.getByEmail(email);
    if (userCheck) {
      const matched = comparePasswords(pass, userCheck.password)
      if (matched) {
        console.log('User Validation Success!')
        return userCheck;
      } else {
        throw new HttpException('Passwords do not match!', HttpStatus.UNAUTHORIZED);
      }
    }
    throw new HttpException('User Validation Failed!', HttpStatus.UNAUTHORIZED);
  }
  
  async login(dto: LoginUserDto, res: Response) {
    const user = await this.validateUser( dto.email, dto.password);
    const accessTokenCookie = await this.getCookieWithJwtAccessToken(user.id);
    const refreshTokenCookie = await this.getCookieWithJwtRefreshToken(user.id);
 
    await this.usersService.setCurrentRefreshToken(refreshTokenCookie.token, user.id);
 
    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie.cookie]);

    user.password = undefined;

    return res.json(user);
  }

  public async getCookieWithJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
  }
 
  public getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
    return {
      cookie,
      token
    }
  }

  public getCookieForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0'
    ];
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload: TokenPayload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
    });
    if (payload.userId) {
      return this.usersService.getById(payload.userId);
    }
  }

}