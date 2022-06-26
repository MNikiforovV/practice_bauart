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

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getByUsername(username);
    if (user) {
      const matched = comparePasswords(pass, user.password)
      if (matched) {
        console.log('User Validation Success!')
        const { password, ...result } = user;
        return result;
      } else {
        console.log('Passwords do not match!')
        return null;
      }
    }
    console.log('User Validation Failed!')
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}