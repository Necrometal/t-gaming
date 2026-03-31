import { PrismaService } from '@/prisma.service';
import { ROLES_PRINCIPAL } from './constantes/roles';

const RoleSeeder = async (prisma: PrismaService) => {
  try {
    await prisma.role.createMany({
      data: ROLES_PRINCIPAL,
      skipDuplicates: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export default RoleSeeder;
