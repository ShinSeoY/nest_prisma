import { PrismaClient } from '@prisma/client';
import { users } from './users';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        password: await hash(user.password, 10)
      }
    });
  }
}

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
