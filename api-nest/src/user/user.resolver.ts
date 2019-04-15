import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { PrismaService } from '../prisma/prisma.service';
import { Roles } from '../common/decorators/roles.decorator';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '../generated/prisma-client';
import { UpdateMePayload } from './interfaces';

@Resolver()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) { }

  @Query('me')
  @Roles('admin', 'user')
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @Query('users')
  @Roles('admin')
  async users(): Promise<User[]> {
    return this.prisma.client.users();
  }

  @Mutation('updateMe')
  async updateMe(@UserEntity() user: User, @Args() args: UpdateMePayload): Promise<User> {
    return await this.prisma.client.updateUser({
      data: args,
      where: { id: user.id },
    });
  }

}
