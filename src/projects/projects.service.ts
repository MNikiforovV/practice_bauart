import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Subscriber from 'src/projects/entities/subscribers.entity';
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
      relations: ['author', 'subscribers'],
    });
    if (project) {
      return project;
    }
    throw new HttpException('Project not found', HttpStatus.NOT_FOUND); 
  }

  async updateProject(slug: string, project: UpdateProjectDto) {
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
    throw new HttpException('Project not found', HttpStatus.NOT_FOUND); 
  }

  async delete(slug: string): Promise<DeleteResult> {
    return await this.projectsRepository.delete({ slug: slug });
  }

  async isNotAuthor(project: Project, user: User) {
    if (project.author.email != user.email) {
      return true;
    } else {
    return false;}
  }

  async isAlreadySubscribed(project: Project, user: User) {
    const subProjects = await this.usersService.getSubscribersProjects(user)
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

  async unSubscribe(slug: string, user: User) {
    const project = await this.getProjectBySlug(slug)
    const sub = await this.subscribersRepostory.findOne({ where: {project: { id: project.id }, user: {id: user.id}}, relations:['project', 'user']})
    return await this.subscribersRepostory.delete({ id: sub.id });
  }
  
  //Метод для профиля. Возвращает все проекты пользователя, в которых он автор, и на которые он подписан.
  async getAuthorAndSubs(slug: string) {
    const project = await this.getProjectBySlug(slug)
    const author = project.author
    const subs = await this.subscribersRepostory.find( { where: {project: {id: project.id }}, relations: ['user', 'project'] } )

    const subUsers = []
    for (var s of subs){
      subUsers.push(s.user)
    }

    return {author, subUsers}
  }

  async isSubscribed(slug: string, user: User) {
    const project = await this.getProjectBySlug(slug)
    const sub = await this.subscribersRepostory.findOne({ where: {project: { id: project.id }, user: {id: user.id}}, relations:['project', 'user']})
    if(sub){
      return true
    }
    return false
  }
}
