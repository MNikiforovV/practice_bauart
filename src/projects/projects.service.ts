import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Subscriber from 'src/projects/entities/subscriber.entity';
import User from 'src/users/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import Project from './entities/project.entity';
import { UsersService } from 'src/users/users.service';
import { slugify } from 'src/utils/slugify';


@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,

    @InjectRepository(Subscriber)
    private subscribersRepostory: Repository<Subscriber>,

    private usersService: UsersService
  ) {}

  async createProject(project: CreateProjectDto, user: User) {
    const newProject = this.projectsRepository.create({
      ...project,
      author: user,
      slug: slugify(project.title),
    });
    await this.projectsRepository.save(newProject);
    return newProject;
  }

  async getAllProjects() {
    return await this.projectsRepository.find({ relations: ['author'] });
  }

  async getProjectBySlug(slug: string) {
    const project = await this.projectsRepository.findOne({
      where: { slug: slug },
      relations: ['author'],
    });
    if (project) {
      return project;
    }
    throw new HttpException('Project not found', HttpStatus.FORBIDDEN); //ProjectNotFoundException(id);
  }

  async updateProject(slug: string, project: UpdateProjectDto) {
    //   await this.projectsRepository.update(slug, project);
    //   console.log()
    //   const updatedProject = await this.projectsRepository.findOne({ where:{ slug: slug }}); //id, { relations: ['author'] }
    let toUpdate = await this.projectsRepository.findOne({
      where: { slug: slug },
      relations: ['author'],
    });
    const projctAndSlug = {...project, slug: slugify(project.title)}
    let updated = Object.assign(toUpdate, projctAndSlug);
    const updatedProject = await this.projectsRepository.save(updated);
    if (updatedProject) {
      return updatedProject;
    }
    throw new HttpException('Project not found', HttpStatus.FORBIDDEN); //ProjectNotFoundException(id);
  }

  async delete(slug: string): Promise<DeleteResult> {
    return await this.projectsRepository.delete({ slug: slug });
  }



  async isNotAuthor(project: Project, user: User) {
    if (project.author.email == user.email || user.role == 'Admin') {
      return false;
    } else {
    return true;}
  }

  async isAlreadySubscribed(project: Project, user: User) {
    const subProjects = await this.usersService.getSubscribersProjects(user)
    console.log(subProjects)
    for (var p of subProjects) {
      if (p.id == project.id){
        return false
      }
    }
    return true;
  }

  async subscribe(project: Project, user: User) {
    const check = await this.isNotAuthor(project, user)
    const doubleCheck = await this.isAlreadySubscribed(project, user)
    console.log(check, doubleCheck)
    if (check && doubleCheck) {
      const sub = this.subscribersRepostory.create({
        user: user,
        project: project,
      });
      await this.subscribersRepostory.save(sub);
      return sub;
    }else{
    throw new HttpException(
      'You cannot subscibe on your project',
      HttpStatus.FORBIDDEN,
    );}
  }

  async unSubscribe(subscribe_id: number) {
    return await this.subscribersRepostory.delete({ id: subscribe_id });
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
