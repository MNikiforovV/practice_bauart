import Role from './role.enum';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, mixin, Type } from '@nestjs/common';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import { ProjectsService } from 'src/projects/projects.service';


const RoleSubGuard = (role: Role): Type<CanActivate> => {
  @Injectable()
  class RoleSubGuardMixin extends JwtAuthGuard {
    constructor (
      private projectsService: ProjectsService
      ){
      super();
    }
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const requestRequest = context.switchToHttp().getRequest<RequestWithUser>();

      const slug = request.params.slug
      const user = requestRequest.user;
      const project = await this.projectsService.getProjectBySlug(slug)
      const sub = await this.projectsService.getAuthorAndSubs(slug)
      console.log(sub)
      
      console.log(user.id in sub)

      if (project.author.email == user.email || user?.role.includes(role) || user.id in sub) {
        return true
      } else {
        throw new HttpException('Access forbidden', HttpStatus.FORBIDDEN);
        // return false;
      }
    }
  }

  return mixin(RoleSubGuardMixin);
}

export default RoleSubGuard;