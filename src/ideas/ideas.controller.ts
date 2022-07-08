import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('project/:slug/idea')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createIdea(@Body() idea: CreateIdeaDto, @Param() params) {
    const newIdea = await this.ideasService.createIdea(idea, params.slug);
    const discussion = await this.ideasService.createDiscussion(newIdea)
    return newIdea
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllIdeas() {
    return this.ideasService.getAllIdeas();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':slugIdea')
  getIdeaBySlug(@Param() params) {
    return this.ideasService.getIdeaBySlug(params.slugIdea);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':slugIdea')
  updateIdea(@Param() params, @Body() idea: UpdateIdeaDto) {
    return this.ideasService.updateIdea(params.slugIdea, idea);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':slugIdea')
  removeIdea(@Param() params) {
    return this.ideasService.removeIdea(params.slugIdea);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':slugIdea/sendmessage/:disId')
  sendMessage(@Param() params, @Body() message: CreateMessageDto){
    return this.ideasService.createMessage(params.disId, message)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':slugIdea/sendmessage/:disId')
  getMessages(@Param() params){
    return this.ideasService.getMessagesByDiscussion(params.disId)
  }
}
