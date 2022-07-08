import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';

@Controller('project/:slug/idea')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createIdea(@Body() idea: CreateIdeaDto, @Param() params) {
    return this.ideasService.createIdea(idea, params.slug);
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
  updateIdea(@Param() params, @Body() idea: UpdateIdeaDto) {
    return this.ideasService.updateIdea(params.slugIdea, idea);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':slugIdea')
  removeIdea(@Param() params) {
    return this.ideasService.removeIdea(params.slugIdea);
  }
}
