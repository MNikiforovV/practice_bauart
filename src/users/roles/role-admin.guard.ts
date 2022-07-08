import Role from './role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';
 
const RoleAdminGuard = (role: Role): Type<CanActivate> => {
  class RoleAdminGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
 
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
 
      return user?.role.includes(role);
    }
  }
 
  return mixin(RoleAdminGuardMixin);
}
 
export default RoleAdminGuard;