import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReferralService } from './referral.service';

@Controller('referrals')
@UseGuards(AuthGuard('jwt'))
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Post()
  async create(@Body() body: { referrerId: number; refereeId: number }) {
    return this.referralService.create(body.referrerId, body.refereeId);
  }

  @Get(':userId')
  async getReferrals(@Param('userId') userId: string) {
    return this.referralService.getReferrals(Number(userId));
  }

  @Get(':userId/rewards')
  async getRewards(@Param('userId') userId: string) {
    return this.referralService.getRewards(Number(userId));
  }
}
