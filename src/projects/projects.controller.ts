import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { ApiOperation } from '@nestjs/swagger';

@Controller('project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create project' })
  @Post('create')
  async createPost(@Body() projct: CreateProjectDto, @Req() req: RequestWithUser) {
    return await this.projectsService.createProject(projct, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all projects' })
  @Get()
  async findAll() {
    return await this.projectsService.getAllProjects();
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.projectsService.findOne(+id);
  // }

  @ApiOperation({ summary: 'Update project' })
  @Patch(':slug')
  async update(@Param() params, @Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectsService.updateProject(params.slug, updateProjectDto);
  }

  @ApiOperation({ summary: 'Delete project' })
  @Delete(':slug')
  remove(@Param() params) {
    return this.projectsService.delete(params.slug);
  }
}
