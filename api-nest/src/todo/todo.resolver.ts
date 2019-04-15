import {
  Query,
  Resolver,
  Subscription,
  Mutation,
  Args,
  Info,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { PrismaService } from '../prisma/prisma.service';
import { BatchPayload } from '../generated/prisma-client';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '../generated/prisma-client';
import { Todo } from '../generated/prisma-client';
//import { TodosPages } from '../graphql.schema';
import { TodoService } from './todo.service';

@Resolver()
@UseGuards(JwtAuthGuard, RolesGuard)
export class TodoResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly todo: TodoService
  ) {}

  @Query('getTodos')
  async getTodos(@UserEntity() user: User, @Args() args): Promise<Todo[]> {
    return await this.prisma.client.user({ id: user.id }).todos(args);
  }

  @Query('getTodoById')
  async getTodoById(@UserEntity() user: User, @Args('id') todoId): Promise<Todo> {
    return await this.todo.getTodoById(user.id, todoId);
  }

  @Query('getTodosPages')
  async getTodosPages(@UserEntity() user: User, @Args() args): Promise<any> {

    const page = args.page;
    const pageSize = args.pageSize;
    const skip = (page - 1) * pageSize;
    const first = pageSize
    


    return await this.todo.getTodosPages(user.id, page, skip, first, args.orderBy);
  }

  @Mutation('createTodo')
  async createTodo(@UserEntity() user: User, @Args() args): Promise<Todo> {    
    return await this.todo.createTodo(args, user.id);
  }

  @Mutation('updateTodo')
  async updateTodo(@UserEntity() user: User, @Args() args): Promise<Todo> {
    return await this.prisma.client.updateTodo(args);
  }

  // // @Mutation('updateManyTodo')
  // // async updateManyTodo(@Args() args): Promise<BatchPayload> {
  // //   return await this.prisma.prisma.updateManyTodoes(args);
  // // }

  @Mutation('deleteTodo')
  async deleteTodo(@Args() args): Promise<Todo> {
    return await this.prisma.client.deleteTodo(args);
  }

  // @Mutation('deleteManyTodo')
  // async deleteManyTodo(@Args() args): Promise<BatchPayload> {
  //   return await this.prisma.prisma.deleteManyTodoes(args);
  // }

  // @Subscription('todo')
  // onUserMutation() {
  //   return {
  //     subscribe: (obj, args, ctx, info) => {
  //       return this.prisma.post(args, info);
  //     },
  //   };
  // }
}
