import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import RequestWithUser from 'src/auth/requestWithUser.interface';

@Controller('project/:slug/idea')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createIdea(
    @Body() idea: CreateIdeaDto,
    @Param() params,
    @Req() req: RequestWithUser,
  ) {
    const newIdea = await this.ideasService.createIdea(
      idea,
      params.slug,
      req.user,
    );
    const discussion = await this.ideasService.createDiscussion(newIdea);
    return newIdea;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllIdeas(@Param() params) {
    return await this.ideasService.getAllIdeas(params.slug);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':slugIdea')
  getIdeaBySlug(@Param() params) {
    return this.ideasService.getIdeaBySlug(params.slugIdea);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':slugIdea')
  async updateIdea(@Param() params, @Body() idea: UpdateIdeaDto) {
    return await this.ideasService.updateIdea(params.slugIdea, idea);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':slugIdea')
  removeIdea(@Param() params) {
    return this.ideasService.removeIdea(params.slugIdea);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':slugIdea/sendmessage/')
  sendMessage(
    @Param() params,
    @Body() message: CreateMessageDto,
    @Req() req: RequestWithUser,
  ) {
    return this.ideasService.createMessage(params.slugIdea, message, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':slugIdea/sendmessage/')
  getMessages(@Param() params) {
    return this.ideasService.getMessagesByDiscussion(params.slugIdea);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':slugIdea/archive')
  async archive(@Param() params) {
    return this.ideasService.archive(params.slugIdea);
  }
}
