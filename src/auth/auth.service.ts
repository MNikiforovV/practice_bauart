import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/bcrypt';
import LoginUserDto from 'src/users/dto/loginUser.dto';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}

  async validateUser(LoginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.getByEmail(LoginUserDto.email);
    if (user) {
      const matched = comparePasswords(LoginUserDto.password, user.password)
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