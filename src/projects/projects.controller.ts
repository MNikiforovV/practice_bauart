import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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
    @Body() projct: CreateProjectDto,
    @Req() req: RequestWithUser,
  ) {
    return await this.projectsService.createProject(projct, req.user);
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
  @Delete('unsubscribe/:id')
  async unSubscribe(@Req() req: RequestWithUser, @Param() param) {
    return await this.projectsService.unSubscribe(param.id);
  }

  @UseGuards(RoleCreatorGuard(Role.Admin))
  @ApiOperation({ summary: 'Update project' })
  @Patch(':slug')
  async update(
    @Param() params,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req: RequestWithUser,
  ) {
    const project = await this.projectsService.getProjectBySlug(params.slug);
    // console.log('patch')
    return await this.projectsService.updateProject(
      params.slug,
      updateProjectDto,
    );
  }

  @UseGuards(RoleCreatorGuard(Role.Admin))
  @ApiOperation({ summary: 'Delete project' })
  @Delete(':slug')
  async remove(@Param() params, @Req() req: RequestWithUser) {
    const project = await this.projectsService.getProjectBySlug(params.slug);
    //console.log(project)
    // if (this.projectsService.isAuthor(project, req.user)){
    return this.projectsService.delete(params.slug);
    // }
    throw new HttpException('Table wasnt updated', HttpStatus.FORBIDDEN);
  }
}
