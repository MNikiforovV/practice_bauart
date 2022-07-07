import { Module } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasController } from './ideas.controller';
import Idea from './entities/idea.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Idea]), ProjectsModule],
  controllers: [IdeasController],
  providers: [IdeasService]
})
export class IdeasModule {}
