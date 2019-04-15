import { Injectable } from '@nestjs/common';
import {
  NotAuthenticatedError,
  TodoNotFoundError
} from '../common/apollo-errors';
import { PrismaService } from '../prisma/prisma.service';
import { Todo } from '../generated/prisma-client';
// import { TodosPages } from '../graphql.schema';
import { CreateTodoPayload } from './interfaces';
import { MyLogger } from '../common/logger/logger.service';

// TODO:
// Need a better way find all todos belong one user
@Injectable()
export class TodoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: MyLogger,
  ) {}

  async getTodoById(userId: string, todoId: string): Promise<Todo> {
    if (!userId) throw NotAuthenticatedError;
    if (!todoId) throw TodoNotFoundError;

    const todos: Todo[] = await this.prisma.client.user({ id: userId }).todos({
      where: { id: todoId },
    });

    if (!todos || todos.length != 1) throw TodoNotFoundError;

    //this.logger.debug("getTodoById() return = \n%j", todos[0]);
    this.logger.debug('getTodoById() return = \n%o', todos[0]);
    return todos[0];
  }


  // TODO:
  // how to use Promise<TodosPages> instead of Promise<any>
  // import { TodosPages } from '../graphql.schema';
  async getTodosPages(
    userId: string,
    page: number,
    skip: number,
    first: number,
    orderBy: string,
  ): Promise<any> {

    if (!userId) throw NotAuthenticatedError;

    const todos: Todo[] = await this.prisma.client.user({ id: userId }).todos({
      skip,
      first,
      orderBy: orderBy ? 'createdAt_DESC' : null,
    });

    if (!todos) throw TodoNotFoundError;

    const count = await this.prisma.client
      .todoesConnection({
        where: { author: { id: userId} },
      })
      .aggregate()
      .count();

    return {
      items: todos,
      count,
      page,
    };
  }

  async createTodo(args: CreateTodoPayload, userId: string): Promise<Todo> {
    if (!userId) throw NotAuthenticatedError;

    const todo = await this.prisma.client.createTodo({
      ...args,
      author: {
        connect: {
          id: userId,
        },
      },
    });

    return todo;
  }
}
