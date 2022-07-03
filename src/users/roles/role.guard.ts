import Role from './role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

 
const RoleGuard = (role: Role): Type<CanActivate> => {
    class RoleGuardMixin extends JwtAuthGuard {
      async canActivate(context: ExecutionContext) {
        await super.canActivate(context);
   
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const user = request.user;
   
        return user?.role.includes(role);
      }
    }
 
  return mixin(RoleGuardMixin);
}
 
export default RoleGuard;