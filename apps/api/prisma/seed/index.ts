import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.product.createMany({
    data: [
      { slug: 'tapis-bleu', name: 'Tapis bleu', priceCents: 2999, stock: 10 },
      { slug: 'tapis-rouge', name: 'Tapis rouge', priceCents: 3499, stock: 5 },
      { slug: 'tapis-vert', name: 'Tapis vert', priceCents: 2799, stock: 7 }
    ],
  });
}
main()
  .then(() => {
    console.log('✅ Seed complete');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
