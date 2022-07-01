import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @MinLength(4)
    @IsString()
    @IsNotEmpty()
    password: string;
  }
   
export default CreateUserDto;