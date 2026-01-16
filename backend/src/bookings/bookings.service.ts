import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: {
    listingId: number;
    startDate: string;
    endDate: string;
    totalPrice: number;
    userId: number; // For now, we'll pass userId directly (or use a default)
  }) {
    const { listingId, startDate, endDate, totalPrice, userId } = createBookingDto;
    
    // Simple validation (in a real app, check availability)
    
    return this.prisma.booking.create({
      data: {
        listingId,
        userId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice,
      },
      include: {
        listing: true, // Return listing details with booking
      },
    });
  }

  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  
  async findByUser(userId: number) {
     return this.prisma.booking.findMany({
      where: { userId },
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
