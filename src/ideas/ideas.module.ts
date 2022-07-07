import { Module } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasController } from './ideas.controller';
import Idea from './entities/idea.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from 'src/projects/projects.module';
import Project from 'src/projects/entities/project.entity';
import { ProjectsService } from 'src/projects/projects.service';
import { Subscriber } from 'rxjs';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Idea, Project, Subscriber]), ProjectsModule, UsersModule],
  controllers: [IdeasController],
  providers: [IdeasService, ProjectsService, UsersService],
  exports:[IdeasService]
})
export class IdeasModule {}
