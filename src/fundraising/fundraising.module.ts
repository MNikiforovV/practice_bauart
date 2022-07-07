import { Module } from '@nestjs/common';
import { FundraisingService } from './fundraising.service';
import { FundraisingController } from './fundraising.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Fundraising from './entities/fundraising.entity';
import { IdeasModule } from 'src/ideas/ideas.module';
import Donations from './entities/donations.entity';
import { IdeasService } from 'src/ideas/ideas.service';
import Idea from 'src/ideas/entities/idea.entity';
import { ProjectsService } from 'src/projects/projects.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fundraising, Donations, Idea]), IdeasModule, UsersModule],
  controllers: [FundraisingController],
  providers: [FundraisingService, IdeasService, ProjectsService, UsersService]
})
export class FundraisingModule {}
