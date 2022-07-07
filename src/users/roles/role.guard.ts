import Role from './role.enum';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, mixin, Type } from '@nestjs/common';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import { ProjectsService } from 'src/projects/projects.service';


const RoleGuard = (role: Role): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin extends JwtAuthGuard {
    constructor (private projectsService: ProjectsService){
      super();
    }
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const requestRequest = context.switchToHttp().getRequest<RequestWithUser>();

      const slug = request.params.slug
      const user = requestRequest.user;
      const project = await this.projectsService.getProjectBySlug(slug)
      
      if (project.author.email == user.email || user?.role.includes(role)) {
        return true
      } else {
        throw new HttpException('Access forbidden', HttpStatus.FORBIDDEN);
        // return false;
      }
    }
  }

  return mixin(RoleGuardMixin);
}

export default RoleGuard;