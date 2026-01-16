import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: any) {
    // For MVP, we'll assume a dummy user ID 1 if not provided, or frontend sends it.
    // In production, extract user from JWT.
    const dto = { ...createBookingDto, userId: 1 }; 
    // If listingId is a string, convert to number
    if (typeof dto.listingId === 'string') {
        dto.listingId = parseInt(dto.listingId, 10);
    }
    return this.bookingsService.create(dto);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }
  
  @Get('my')
  findMyBookings() {
    // Hardcoded user ID 1 for MVP
    return this.bookingsService.findByUser(1);
  }
}
