import Role from './role.enum';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, mixin, Type } from '@nestjs/common';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import { ProjectsService } from 'src/projects/projects.service';

const RoleCreatorGuard = (role: Role): Type<CanActivate> => {
  @Injectable()
  class RoleCreatorGuardMixin extends JwtAuthGuard {
    constructor(private projectsService: ProjectsService) {
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

      if (project.author.email == user.email || user?.role.includes(role)) {
        return true;
      } else {
        throw new HttpException('Access forbidden', HttpStatus.FORBIDDEN);
      }
    }
  }

  return mixin(RoleCreatorGuardMixin);
};

export default RoleCreatorGuard;
