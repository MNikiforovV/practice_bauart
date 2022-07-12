import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import User from './entities/user.entity';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource, getConnection, getRepository, Repository } from 'typeorm';
import CreateUserDto from './dto/createUser.dto';
import { encodePassword } from 'src/utils/bcrypt';
import * as bcrypt from 'bcrypt';
import Project from 'src/projects/entities/project.entity';
import Subscriber from 'src/projects/entities/subscribers.entity';
import Donations from 'src/fundraising/entities/donations.entity';


// This should be a real class/interface representing a user entity
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,

    @InjectRepository(Subscriber)
    private subscribersRepostory: Repository<Subscriber>,
    
    @InjectRepository(Donations)
    private donationsRepository: Repository<Donations>
  ) { }

  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email: email }, relations: ['subscribed'] })
    if (!user) {
      throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }
    return user
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id: id }, relations: ['subscribed'] });
    if (!user) {
      throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async tryGetUser(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email: email }, relations: ['subscribed'] })
    if (!user) {
      null;
    } else {
      return user
    }
  }

  async createUser(userData: CreateUserDto) {
    const user = await this.tryGetUser(userData.email)
    if (!user) {
      const password = encodePassword(userData.password);
      const newUser = this.usersRepository.create({ ...userData, password });
      await this.usersRepository.save(newUser);
      return newUser;

    } else {
      throw new HttpException('Username and email must be unique', HttpStatus.NOT_ACCEPTABLE)
    }
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null
    });
  }

  async getProjectsByUser(user: User) {
    const userWithProjects = await this.usersRepository.findOne({ where: { id: user.id }, relations: ['projects'] });

    console.log(userWithProjects)
    if (userWithProjects) {
      return userWithProjects.projects;
    }
    throw new HttpException('Project not found', HttpStatus.FORBIDDEN);
  }

  async getSubscribersProjects(user: User) {
    const subbedProjectsId = await this.subscribersRepostory.find({ 
      relations: ["user", 'project'],
      where: {
        user: {
          id: user.id
        }
      }      
    })

    const subbedProjects = []
    for (var p of subbedProjectsId) {
      subbedProjects.push(p.project)
    }

    return subbedProjects
  }

  async getFundraisingsByUser(user: User) {
    const donations = await this.donationsRepository.find({ 
      relations: ["user", 'fundraising'],
      where: {
        user: {
          id: user.id
        }
      }      
    })

    // const subbedProjects = []
    // for (var p of subbedProjectsId) {
    //   subbedProjects.push(p.project)
    // }

    return donations
  }

}