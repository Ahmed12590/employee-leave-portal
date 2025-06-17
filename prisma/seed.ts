// /prisma/seed.ts
import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@leave.com',
      password: hashedPassword,
      role: 'admin',
    },
  });
}

main();
