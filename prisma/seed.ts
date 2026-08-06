import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();

  
  const corbaCategory = await prisma.category.create({
    data: {
      name: 'Çorbalar',
      items: {
        create: [
          { name: 'Mercimek Çorbası', price: 80.0, description: 'Sıcak ev yapımı mercimek çorbası' },
          { name: 'Ezogelin Çorbası', price: 85.0, description: 'Geleneksel lezzet' },
        ],
      },
    },
  });

  const anaYemekCategory = await prisma.category.create({
    data: {
      name: 'Ana Yemekler',
      items: {
        create: [
          { name: 'Adana Kebap', price: 250.0, description: 'Közlenmiş biber ve domates ile' },
          { name: 'Izgara Köfte', price: 220.0, description: 'Patates kızartması ve pilav ile' },
        ],
      },
    },
  });

  console.log('Test verileri başarıyla yüklendi!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });