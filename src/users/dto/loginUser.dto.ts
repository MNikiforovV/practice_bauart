import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export default LoginUserDto;