import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import User from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/createUser.dto';
import { encodePassword } from 'src/utils/bcrypt';

// This should be a real class/interface representing a user entity
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where:{ email: email }})
    if (!user){
      throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }
    return user
  }

  async getById(id: number) {
      const user = await this.usersRepository.findOne({ where:{ id: id }});
      if (!user) {
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
      }
      return user;
    }

  async createUser(userData: CreateUserDto) {
    const user = await this.getByEmail(userData.email)
    if (!user){
      const password = encodePassword(userData.password);
      const newUser = this.usersRepository.create({ ...userData, password});
      await this.usersRepository.save(newUser);
      return newUser;
    
    } else {
      throw new HttpException('Username and email must be unique', HttpStatus.NOT_ACCEPTABLE)
    }
  }
}