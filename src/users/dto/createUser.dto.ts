import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;

    @MinLength(4)
    @IsString()
    @IsNotEmpty()
    password: string;
  }
   
export default CreateUserDto;