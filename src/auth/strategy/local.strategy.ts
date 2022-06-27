import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import LoginUserDto from 'src/users/dto/loginUser.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(user: LoginUserDto): Promise<any> {
    const userCheck = await this.authService.validateUser(user);
    if (!userCheck) {
      throw new UnauthorizedException();
    }
    return userCheck;
  }
}