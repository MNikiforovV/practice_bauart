import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const userCheck = await this.usersService.getByEmail(email);
    if (userCheck) {
      const matched = comparePasswords(pass, userCheck.password)
      if (matched) {
        console.log('User Validation Success!')
        const { password, ...result } = userCheck;
        return result;
      } else {
        console.log('Passwords do not match!')
        return null;
      }
    }
    console.log('User Validation Failed!')
    return null;
  }
  
  //вроде уже и не нужен
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age='60s'`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

}