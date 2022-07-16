import Role from './role.enum';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, mixin, Type } from '@nestjs/common';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import { ProjectsService } from 'src/projects/projects.service';
import { UsersService } from '../users.service';

const RoleSubGuard = (role: Role): Type<CanActivate> => {
  @Injectable()
  class RoleSubGuardMixin extends JwtAuthGuard {
    constructor(
      private projectsService: ProjectsService,
      private usersServices: UsersService,
    ) {
      super();
    }
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const requestRequest = context
        .switchToHttp()
        .getRequest<RequestWithUser>();

      const slug = request.params.slug;
      const user = requestRequest.user;
      const project = await this.projectsService.getProjectBySlug(slug);

      const sub = await this.projectsService.isSubscribed(slug, user);

      if (
        project.author.email == user.email ||
        user?.role.includes(role) ||
        sub
      ) {
        return true;
      } else {
        throw new HttpException('Access forbidden', HttpStatus.FORBIDDEN);
      }
    }
  }

  return mixin(RoleSubGuardMixin);
};

export default RoleSubGuard;
