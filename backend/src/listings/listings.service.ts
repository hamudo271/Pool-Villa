import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.listing.findMany();
  }

  findOne(id: number) {
    return this.prisma.listing.findUnique({
      where: { id },
    });
  }

  search(query: string, region?: string) {
    const where: any = {};

    if (query) {
      where.OR = [
        { title: { contains: query } },
        { description: { contains: query } },
        { category: { contains: query } },
      ];
    }

    if (region) {
      where.title = { contains: region }; // Simple proxy for region since we don't have a region column yet
    }

    return this.prisma.listing.findMany({ where });
  }
}
