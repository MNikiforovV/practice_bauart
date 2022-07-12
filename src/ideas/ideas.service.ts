import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsService } from 'src/projects/projects.service';
import User from 'src/users/entities/user.entity';
import { slugify } from 'src/utils/slugify';
import { Repository } from 'typeorm';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import Discussion from './entities/discussion.entity';
import Idea from './entities/idea.entity';
import Message from './entities/message.entity';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(Idea)
    private ideasRepository: Repository<Idea>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Discussion)
    private discussionRepository: Repository<Discussion>,

    private projectsService: ProjectsService
  ){}

  async createIdea(idea: CreateIdeaDto, slug: string, user: User) {
    const project = await this.projectsService.getProjectBySlug(slug)
    const newIdea = this.ideasRepository.create({
      ...idea,
      slug: slugify(idea.title),
      project: project,
      author: user
    });
    await this.ideasRepository.save(newIdea)
    return newIdea;
  }

  async getAllIdeas(slug: string) {
    return await this.ideasRepository.find({ where: {project: {slug: slug}} ,relations: ['project', 'author'] });
  }

  async getIdeaBySlug(slug: string) {
    const idea = await this.ideasRepository.findOne({ where: {slug: slug}, relations: ['project', 'discussion', 'author'] });
    if (idea){
      return idea;
    }
    throw new HttpException('Idea not found', HttpStatus.NOT_FOUND)
  }

  async updateIdea(slug: string, idea: UpdateIdeaDto) {
    // const toUpdate = await this.ideasRepository.findOne({
    //   where: { slug: slug },
    //   relations: ['project'],
    // });
    const toUpdate = await this.getIdeaBySlug(slug)
    const ideaAndSlug = {...idea, slug: slugify(idea.title)}
    console.log(toUpdate)
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

  async createDiscussion(idea: Idea){
    const discussion = await this.discussionRepository.create({
      idea: idea
    })
    await this.discussionRepository.save(discussion)
    return discussion
  }

  async getDiscussionById(id: number){
    const discussion = await this.discussionRepository.findOne({ where: {id: id}, relations: ['idea'] });
    if (discussion){
      return discussion;
    }
    throw new HttpException('Idea not found', HttpStatus.NOT_FOUND)
  }

  async createMessage(slug: string, createMessageDto: CreateMessageDto, user: User){
    const discussion = await (await this.getIdeaBySlug(slug)).discussion
    const message = this.messageRepository.create({
      ...createMessageDto,
      discussion: discussion,
      author: user
    });
    await this.messageRepository.save(message)
    return message;
  }

  async getMessagesByDiscussion(slug: string){
    const discussion = await (await this.getIdeaBySlug(slug)).discussion
    // const discussion = await this.getDiscussionById(id)
    const messages = await this.messageRepository.find({where: {discussion: {id: discussion.id}}, relations:['discussion', 'author']})
    if(messages){
      return messages
    }
    throw new HttpException('Messages not found', HttpStatus.NOT_FOUND)
  }
}
