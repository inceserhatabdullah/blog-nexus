import { PrismaClient } from '@core/prisma/client';
import { Authorities } from '../src/core/enums/authorities.enum';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function main() {

  for (const authority of Object.values(Authorities)) {
    await prisma.role.upsert(
      {
        where: {
          name: authority
        },
        create: {
          name: authority
        },
        update: {}
      }
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });