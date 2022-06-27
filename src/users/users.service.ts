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

  async getByUsername(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where:{ username: username }})
    if (user){
      return user
    }
    throw new HttpException('User with this username does not exist', HttpStatus.NOT_FOUND);
  }

  async createUser(userData: CreateUserDto) {
    const password = encodePassword(userData.password);
    const newUser = this.usersRepository.create({ ...userData, password});
    await this.usersRepository.save(newUser);
    return newUser;
  }
}