import RoleSeeder from './RoleSeeder';
import { PrismaService } from '@/prisma.service';

const prisma = new PrismaService();

async function main() {
  await RoleSeeder(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
