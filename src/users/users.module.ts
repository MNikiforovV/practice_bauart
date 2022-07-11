import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import Subscriber from 'src/projects/entities/subscriber.entity';
import Project from 'src/projects/entities/project.entity';
import Donations from 'src/fundraising/entities/donations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Subscriber, Project, Donations])],
  controllers:[UserController],
  providers: [UsersService, AuthService, JwtService, ConfigService],
  exports: [TypeOrmModule],
})
export class UsersModule {}