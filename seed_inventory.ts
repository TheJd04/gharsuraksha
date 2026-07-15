import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("No user found to seed items for.");
    return;
  }

  // Get or create some categories
  const electronicsCategory = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: { name: 'Electronics', icon: '💻', isPreseeded: true }
  });

  const furnitureCategory = await prisma.category.upsert({
    where: { name: 'Furniture' },
    update: {},
    create: { name: 'Furniture', icon: '🛋️', isPreseeded: true }
  });

  const appliancesCategory = await prisma.category.upsert({
    where: { name: 'Appliances' },
    update: {},
    create: { name: 'Appliances', icon: '❄️', isPreseeded: true }
  });

  const jewelryCategory = await prisma.category.upsert({
    where: { name: 'Jewelry' },
    update: {},
    create: { name: 'Jewelry', icon: '💍', isPreseeded: true }
  });

  const itemsData = [
    { name: 'MacBook Pro 16"', brand: 'Apple', model: 'M3 Max', estimatedValue: 350000, room: 'Study', condition: 'new', categoryId: electronicsCategory.id, userId: user.id },
    { name: 'Sony Bravia 65"', brand: 'Sony', model: 'X90L', estimatedValue: 120000, room: 'Living Room', condition: 'good', categoryId: electronicsCategory.id, userId: user.id },
    { name: 'Samsung Refrigerator', brand: 'Samsung', model: 'Bespoke', estimatedValue: 85000, room: 'Kitchen', condition: 'good', categoryId: appliancesCategory.id, userId: user.id },
    { name: 'L-Shaped Sofa', brand: 'Pepperfry', model: 'Valencia', estimatedValue: 65000, room: 'Living Room', condition: 'good', categoryId: furnitureCategory.id, userId: user.id },
    { name: 'Gold Necklace (22k)', brand: 'Tanishq', estimatedValue: 250000, room: 'Master Bedroom', condition: 'good', categoryId: jewelryCategory.id, userId: user.id },
    { name: 'Diamond Ring', brand: 'Kalyan Jewellers', estimatedValue: 150000, room: 'Master Bedroom', condition: 'new', categoryId: jewelryCategory.id, userId: user.id },
    { name: 'Washing Machine', brand: 'LG', model: 'ThinQ 8kg', estimatedValue: 42000, room: 'Utility', condition: 'good', categoryId: appliancesCategory.id, userId: user.id },
    { name: 'Microwave Oven', brand: 'IFB', model: '30L Convection', estimatedValue: 15000, room: 'Kitchen', condition: 'good', categoryId: appliancesCategory.id, userId: user.id },
    { name: 'Dining Table (6 Seater)', brand: 'Urban Ladder', estimatedValue: 55000, room: 'Dining', condition: 'good', categoryId: furnitureCategory.id, userId: user.id },
    { name: 'King Size Bed', brand: 'Wakefit', estimatedValue: 35000, room: 'Master Bedroom', condition: 'good', categoryId: furnitureCategory.id, userId: user.id },
    { name: 'Office Chair', brand: 'Green Soul', model: 'Monster Ultimate', estimatedValue: 18000, room: 'Study', condition: 'good', categoryId: furnitureCategory.id, userId: user.id },
    { name: 'PS5 Console', brand: 'Sony', estimatedValue: 55000, room: 'Living Room', condition: 'good', categoryId: electronicsCategory.id, userId: user.id },
    { name: 'iPad Pro 11"', brand: 'Apple', model: 'M2', estimatedValue: 80000, room: 'Study', condition: 'good', categoryId: electronicsCategory.id, userId: user.id },
    { name: 'Dyson Vacuum Cleaner', brand: 'Dyson', model: 'V12 Detect', estimatedValue: 55000, room: 'Utility', condition: 'good', categoryId: appliancesCategory.id, userId: user.id },
    { name: 'Air Conditioner 1.5 Ton', brand: 'Daikin', model: 'Inverter', estimatedValue: 45000, room: 'Master Bedroom', condition: 'good', categoryId: appliancesCategory.id, userId: user.id },
    { name: 'Coffee Maker', brand: 'Nespresso', model: 'Essenza Mini', estimatedValue: 14000, room: 'Kitchen', condition: 'good', categoryId: appliancesCategory.id, userId: user.id },
    { name: 'Bookshelf', brand: 'IKEA', model: 'Billy', estimatedValue: 8000, room: 'Study', condition: 'good', categoryId: furnitureCategory.id, userId: user.id },
    { name: 'Smart Watch', brand: 'Apple', model: 'Series 9', estimatedValue: 45000, room: 'Master Bedroom', condition: 'good', categoryId: electronicsCategory.id, userId: user.id },
    { name: 'Water Purifier', brand: 'Kent', model: 'RO+UV', estimatedValue: 18000, room: 'Kitchen', condition: 'good', categoryId: appliancesCategory.id, userId: user.id },
    { name: 'Soundbar', brand: 'JBL', model: 'Bar 5.1', estimatedValue: 45000, room: 'Living Room', condition: 'good', categoryId: electronicsCategory.id, userId: user.id }
  ];

  await prisma.item.createMany({
    data: itemsData
  });

  console.log("Successfully seeded 20 items!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
