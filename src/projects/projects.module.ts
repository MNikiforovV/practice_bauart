import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Project from './entities/project.entity';
import Subscriber from 'src/projects/entities/subscriber.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Subscriber]), UsersModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, UsersService], 
  exports:[ProjectsService]
  
})
export class ProjectsModule {}
