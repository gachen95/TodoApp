// example
// https://github.com/prisma/prisma-examples/blob/master/typescript/docker-mysql/prisma/seed.ts

import { prisma } from '../src/generated/prisma-client'

async function main() {
  await prisma.createUser({
    username: 'admin',
    email: 'admin@example.com',
    password: '$2b$10$jWG1.Ww6F5vePQiOjzQTB.2qgrS8oagQHuOkSMoRhdzIgAWEaohYy',  // admin
    role: 'ADMIN',
    todos: {
      create: [        
        {
          title: '1 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '2 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '3 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '4 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '5 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '6 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '7 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '8 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '9 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '10 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '11 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '12 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '13 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '14 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '15 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '16 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '17 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '18 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '19 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '20 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: '21 todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
        {
          title: 'Admin todoes',
          description: 'this is test for admin',
          isCompleted: false,
        },
      ],
    },
  });


  await prisma.createUser({
    username: 'alice',
    email: 'alice@example.com',
    password: '$2b$10$bpQjZ/UEC9LUtTBy/hIKL.7Le9rI9.a7r5jnw7499VJCdq14z0lce',  // test
    todos: {
      create: [
        {
          title: 'Alice todo',
          description: 'This is test for alice',
          isCompleted: true,
        },
      ],
    },
  });

  await prisma.createUser({
    username: 'bob',
    email: 'bob@example.com',
    password: '$2b$10$bpQjZ/UEC9LUtTBy/hIKL.7Le9rI9.a7r5jnw7499VJCdq14z0lce',  // test
    todos: {
      create: [
        {
          title: 'Bob todo',
          description: 'This is test for Bob',
          isCompleted: true,
          comments: {
            create: [
              {
                text: 'Can recommend 💯',
                writtenBy: {
                  connect: { email: 'alice@example.com' },
                },
              },
            ],
          },
        },
        {
          title: 'Follow Prisma on Twitter',
          description: 'https://twitter.com/prisma',
        },
      ],
    },
  })

}

main()