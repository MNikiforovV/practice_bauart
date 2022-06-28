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

  async validate(LoginUserDto: LoginUserDto): Promise<any> {
    const user = await this.authService.validateUser(LoginUserDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}