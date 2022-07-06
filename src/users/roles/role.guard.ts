import Role from './role.enum';
import { CanActivate, ExecutionContext, Injectable, mixin, Type } from '@nestjs/common';
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
      // console.log('1', slug)

      //const updatedProject = await getProjectBySlug(project)

      const user = requestRequest.user;
      //console.log('2',user)

      //console.log(this.projectsService)
      const project = await this.projectsService.getProjectBySlug(slug)
      console.log(project)
      if (project.author.email == user.email) {
        return true
      } else {
        return false;
      }
    }
  }

  return mixin(RoleGuardMixin);
}

export default RoleGuard;