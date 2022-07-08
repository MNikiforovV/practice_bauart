import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsService } from 'src/projects/projects.service';
import User from 'src/users/entities/user.entity';
import { slugify } from 'src/utils/slugify';
import { Repository } from 'typeorm';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import Idea from './entities/idea.entity';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(Idea)
    private ideasRepository: Repository<Idea>,
    private projectsService: ProjectsService
  ){}

  async createIdea(idea: CreateIdeaDto, slug: string) {
    const project = await this.projectsService.getProjectBySlug(slug)
    console.log(project)
    const newIdea = this.ideasRepository.create({
      ...idea,
      slug: slugify(idea.title),
      project: project
    });
    await this.ideasRepository.save(newIdea)
    return newIdea;
  }

  async getAllIdeas(slug: string) {
    return await this.ideasRepository.find({ where: {project: {slug: slug}} ,relations: ['project'] });
  }

  async getIdeaBySlug(slug: string) {
    const idea = await this.ideasRepository.findOne({ where: {slug: slug}, relations: ['project'] });
    if (idea){
      return idea;
    }
    throw new HttpException('Idea not found', HttpStatus.NOT_FOUND)
  }

  async updateIdea(slug: string, idea: UpdateIdeaDto) {
    let toUpdate = await this.ideasRepository.findOne({
      where: { slug: slug },
      relations: ['project'],
    });
    const ideaAndSlug = {idea, slug: slugify(idea.title)}
    let updated = Object.assign(toUpdate, ideaAndSlug);
    const updatedIdea = await this.ideasRepository.save(updated);
    if (updatedIdea) {
      return updatedIdea;
    }
    throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);
  }

  async removeIdea(slug: string) {
    return this.ideasRepository.delete({ slug: slug });
  }
}
