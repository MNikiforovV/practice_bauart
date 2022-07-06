import Role from './role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import Project from 'src/projects/entities/project.entity';
import { ProjectsService } from 'src/projects/projects.service';



const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    constructor (private projectsService: ProjectsService){
      super();
    }
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const requestRequest = context.switchToHttp().getRequest<RequestWithUser>();

      const project = request.params.slug
      console.log('1', project)

      //const updatedProject = await getProjectBySlug(project)

      const user = requestRequest.user;
      console.log('2',user)

      const projObj = this.projectsService.getProjectBySlug(project)
      console.log(projObj)
      if (project.author == user || user?.role.includes(role)) {
        true
      } else {
        return false;
      }
    }
  }

  return mixin(RoleGuardMixin);
}

export default RoleGuard;