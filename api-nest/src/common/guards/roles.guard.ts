import { Inject, Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { Request } from 'express';
// import { GuestEntity } from '../../entities/guest.entity';

import { User } from '../../generated/prisma-client';
import { isNullOrUndefined } from 'util';
// import { MyLogger }  from '../../shared/logger/logger.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    // @InjectRepository(GuestEntity) private readonly guestRepo: Repository<GuestEntity>,
    // @Inject(MyLogger) private readonly log: MyLogger,
    private readonly reflector: Reflector
    ) {}


  getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 通过反射获取请求路由是否添加了 @Roles() 注解，如果没有添加，则代表不需要进行认证
    const annoteRoles = this.reflector.get<string[]>('roles', context.getHandler())

    if (!annoteRoles) {
      return true;
    }
    
    const roles = annoteRoles.map(role => role.toUpperCase());;

    if (!roles) {
      return true;
    }

    // 在请求对象中获取 user 对象，此 user 对象是 AuthStrategy 中 validate 方法成功执行后的返回值
    // const request = context.switchToHttp().getRequest();
    const request = this.getRequest(context);
    const user: User = request.user;

    // 判断是否为管理员，或当前操作的资源是否是私人的
    const hasRole = () => roles.includes(user.role);    
    // const hasRole = () => !!roles.find((item) => item === user.role);
    //this.log.debug("user.role = " + user.role + ", roles = " + roles + ", hasRole = " + hasRole() + ", isPersonal = " + (await this.isPersonal(user.id, request)));
    //return user && user.role && (hasRole() || (await this.isPersonal(user.id, request)));
    return user && user.role && (hasRole());
  }

  // 判断当前操作的资源是否是私人的，如果是就代表有权限，否则无权限
  // private async isPersonal(userId: string, req: Request): Promise<boolean> {
  //   const path = req.path;
  //   // 普通用户只能修改或删除自己的帖子

  //   if (path.startsWith('/api/guest')) {
  //     const guestId = req.params.id;
  //     //this.log.debug("guestId = " + guestId);
  //     if (!isNaN(guestId)) {
  //       const guest = await this.guestRepo.findOne(guestId, {
  //         relations: ['user'],
  //       });

  //       if (!guest || !guest.user)
  //          return false;

  //          this.log.debug("guest.user.id = " + guest.user.id + ", userId = " + userId);
  //       if (guest.user.id === userId) return true;
  //     }
  //   }

  //   // 普通用户只能更新自己的信息
  //   if (path.startsWith('/api/user')) {
  //     return (
  //       req.method === 'PUT' &&
  //       //!isNaN(userId) &&
  //       !isNullOrUndefined(userId) &&
  //       userId === req.params.id
  //     );
  //   }

  //   return false;
  // }
}
