import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, HttpException, HttpStatus } from '@nestjs/common';
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

  // @ApiOperation({ summary: 'Subscribe to project' })
  // @Patch('subscribe/:slug')
  // async subscribe(@Param() params, @Body() updateProjectDto: UpdateProjectDto) {
  //   const projct = await this.projectsService.getProjectBySlug(params.slug);
  //   return await this.projectsService.updateProject(params.slug, updateProjectDto);
  // }

  @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update project' })
    @Patch(':slug')
    async update(@Param() params, @Body() updateProjectDto: UpdateProjectDto, @Req() req: RequestWithUser) {
      const project = await this.projectsService.getProjectBySlug(params.slug)
      console.log(project)
      if (this.projectsService.isAuthor(project, req.user)){
        const {toUpdate, updatedProject} = await this.projectsService.updateProject(params.slug, updateProjectDto);
        return {toUpdate, updatedProject}
      }
      throw new HttpException('Table wasnt updated', HttpStatus.FORBIDDEN)
    }

  @ApiOperation({ summary: 'Delete project' })
  @Delete(':slug')
  async remove(@Param() params, @Req() req: RequestWithUser) {
    const project = await this.projectsService.getProjectBySlug(params.slug)
    if (this.projectsService.isAuthor(project, req.user)){
      return this.projectsService.delete(params.slug);
    }
    throw new HttpException('Table wasnt updated', HttpStatus.FORBIDDEN)
  }
}
