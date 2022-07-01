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
        //private readonly configService: ConfigService,
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
    const cookie = this.getCookieWithJwtToken(user.id);
    console.log(cookie)
    res.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    console.log(user)
    return res.json(user);
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload)
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age='600s'}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

}