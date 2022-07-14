import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import RoleCreatorGuard from 'src/users/roles/role-creator-admin.guard';
import Role from 'src/users/roles/role.enum';

@ApiTags('project')
@Controller('project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create project' })
  @Post('create')
  async createPost(
    @Body() project: CreateProjectDto,
    @Req() req: RequestWithUser,
  ) {
    return await this.projectsService.createProject(project, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all projects' })
  @Get()
  async findAll() {
    return await this.projectsService.getAllProjects();
  }

  @Get(':slug')
  async findOne(@Param() params) {
    return await this.projectsService.getProjectBySlug(params.slug);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Subscribe to project' })
  @Post('subscribe/:slug')
  async subscribe(@Req() req: RequestWithUser, @Param() param) {
    const project = await this.projectsService.getProjectBySlug(param.slug);
    return await this.projectsService.subscribe(project, req.user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Unsubscribe from project' })
  @Delete('unsubscribe/:slug')
  async unSubscribe(@Req() req: RequestWithUser, @Param() param) {
    return await this.projectsService.unSubscribe(param.slug, req.user);
  }

  @UseGuards(RoleCreatorGuard(Role.Admin))
  @ApiOperation({ summary: 'Update project' })
  @Patch(':slug')
  async update(@Param() params, @Body() updateProjectDto: UpdateProjectDto) {
    const project = await this.projectsService.getProjectBySlug(params.slug);
    return await this.projectsService.updateProject(
      params.slug,
      updateProjectDto,
    );
  }

  @UseGuards(RoleCreatorGuard(Role.Admin))
  @ApiOperation({ summary: 'Delete project' })
  @Delete(':slug')
  async remove(@Param() params) {
    return this.projectsService.delete(params.slug);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':slug/subs')
  async getAuthorAndSubs(@Param() params) {
    return await this.projectsService.getAuthorAndSubs(params.slug);
  }

  @UseGuards(JwtAuthGuard)
  @Get('issub/:slug')
  async isSubscribed(@Param() params, @Req() req: RequestWithUser) {
    return await this.projectsService.isSubscribed(params.slug, req.user);
  }
}
