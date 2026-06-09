import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoyaltyService } from './loyalty.service';

@Controller('loyalty')
@UseGuards(AuthGuard('jwt'))
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Get(':userId')
  async getPoints(@Param('userId') userId: string) {
    return this.loyaltyService.getPoints(Number(userId));
  }

  @Post('add')
  async addPoints(@Body() body: { userId: number; points: number; reason: string }) {
    return this.loyaltyService.addPoints(body.userId, body.points, body.reason);
  }
}
