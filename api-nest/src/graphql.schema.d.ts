
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class AuthPayload {
    token: string;
    user: User;
}

export class Comment {
    id: string;
    text: string;
    writtenBy: User;
}

export abstract class IMutation {
    abstract signup(email: string, password: string, username: string): AuthPayload | Promise<AuthPayload>;
    abstract login(email: string, password: string): AuthPayload | Promise<AuthPayload>;
    abstract createTodo(title: string, description?: string, isCompleted?: boolean): Todo | Promise<Todo>;
    abstract updateTodo(id: string, title: string, description?: string, isCompleted?: boolean): Todo | Promise<Todo>;
    abstract deleteTodo(id: string): Todo | Promise<Todo>;
    abstract updateMe(displayName?: string): User | Promise<User>;
}

export abstract class IQuery {
    abstract getTodoById(id: string): Todo | Promise<Todo>;
    abstract getTodos(): Todo[] | Promise<Todo[]>;
    abstract getTodosPages(page: number, pageSize?: number): TodosPages | Promise<TodosPages>;
    abstract me(): User | Promise<User>;
    abstract users(): User[] | Promise<User[]>;
    abstract temp__(): boolean | Promise<boolean>;
}

export class Todo {
    id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
    author: User;
    comments: Comment[];
}

export class TodosPages {
    page: number;
    items?: Todo[];
    count: number;
}

export class User {
    id: string;
    username: string;
    email: string;
    password: string;
    displayName?: string;
    role: string;
    lastToken?: string;
    lastLogin?: number;
    lastLogout?: number;
    todos: Todo[];
    comments: Comment[];
}
