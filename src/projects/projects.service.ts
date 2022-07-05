import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import Project from './entities/project.entity';
const slug = require('slug');

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>
  ) {}

  async createProject(project: CreateProjectDto, user: User) {
    const newProject = this.projectsRepository.create({
      ...project,
      author: user,
      slug: this.slugify(project. title)
    });
    await this.projectsRepository.save(newProject);
    return newProject;
  }

  async getAllProjects() {
    return await this.projectsRepository.find({ relations: ['author'] });
  }
   
  async getProjectById(slug: string) {
    const project = await this.projectsRepository.findOne({ where:{ slug: slug }});
    if (project) {
      return project;
    }
    throw new HttpException('Project not found', HttpStatus.FORBIDDEN);  //ProjectNotFoundException(id);
  }
   
  async updateProject(slug: string, project: UpdateProjectDto) {
    // await this.projectsRepository.update(slug, project);
    // const updatedProject = await this.projectsRepository.findOne({ where:{ slug: slug }}); //id, { relations: ['author'] }
    let toUpdate = await this.projectsRepository.findOne({ where:{ slug: slug }});
    let updated = Object.assign(toUpdate, project);
    const updatedProject = await this.projectsRepository.save(updated);
    if (updatedProject) {
      return updatedProject
    }
    throw new HttpException('Project not found', HttpStatus.FORBIDDEN);  //ProjectNotFoundException(id);
  }

  async delete(slug: string): Promise<DeleteResult> {
    return await this.projectsRepository.delete({ slug: slug});
  }

  slugify(title: string) {
    return slug(title, {lower: true}) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
  }
  
  // findAll() {
  //   return `This action returns all projects`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} project`;
  // }

  // update(id: number, updateProjectDto: UpdateProjectDto) {
  //   return `This action updates a #${id} project`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} project`;
  // }
}
