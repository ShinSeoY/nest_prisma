import { Role } from '@prisma/client';

// database article seed
export const users = [
  {
    email: 'admin@test.kr',
    name: 'admin1',
    password: '1234',
    role: Role.ADMIN
  },
  {
    email: 'user1@test.kr',
    name: 'user1',
    password: '1234'
  }
];
