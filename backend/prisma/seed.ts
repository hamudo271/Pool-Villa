import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      phone: '010-1234-5678',
    },
  });
  console.log('Created user:', user);

  const listings = [
    {
      title: '가평 더스테이 풀빌라',
      category: '풀빌라',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      price: 159000,
      originalPrice: 350000,
      score: 9.8,
      reviewCount: 128,
      description: '아름다운 가평의 자연 속에서 즐기는 프라이빗한 휴식',
    },
    {
      title: '포천 럭셔리 글램핑 & 풀빌라',
      category: '풀빌라',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      price: 129000,
      originalPrice: 280000,
      score: 9.5,
      reviewCount: 85,
      description: '럭셔리한 글램핑과 풀빌라를 동시에 즐길 수 있는 곳',
    },
    {
      title: '강릉 세인트존스 호텔',
      category: '호텔',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      price: 89000,
      originalPrice: 220000,
      score: 9.2,
      reviewCount: 4500,
      description: '강릉의 바다를 품은 프리미엄 호텔',
    },
    {
      title: '여수 밤바다 펜션',
      category: '펜션',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      price: 69000,
      originalPrice: 150000,
      score: 8.9,
      reviewCount: 320,
      description: '여수 밤바다의 낭만을 즐길 수 있는 펜션',
    },
  ];
  
  const createdListings: any[] = [];
  for (const listing of listings) {
    const l = await prisma.listing.create({
      data: listing,
    });
    createdListings.push(l);
  }

  // Create seed bookings
  const bookings = [
    {
       userId: user.id,
       listingId: createdListings[0].id,
       startDate: new Date('2026-02-10'),
       endDate: new Date('2026-02-12'),
       totalPrice: 350000,
    },
    {
       userId: user.id,
       listingId: createdListings[2].id,
       startDate: new Date('2025-12-25'),
       endDate: new Date('2025-12-27'),
       totalPrice: 440000,
    }
  ];

  for (const booking of bookings) {
      await prisma.booking.create({ data: booking });
  }

  console.log('Seeded bookings');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
