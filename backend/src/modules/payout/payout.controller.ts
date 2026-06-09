import { Controller, Get, Post, Put, Param, Body, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PayoutService } from './payout.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('payouts')
export class PayoutController {
  constructor(private payoutService: PayoutService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get()
  async findAll(@Query('status') status?: string, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.payoutService.findAll(status, page, limit);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.payoutService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('request')
  async request(@CurrentUser() user: any, @Body() body: { amount: number }) {
    const vendor = await this.payoutService['vendorModel'].findOne({ where: { userId: user.id } });
    if (!vendor) throw new Error('Vendor not found');
    return this.payoutService.request(vendor.id, body.amount);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  async myPayouts(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    const vendor = await this.payoutService['vendorModel'].findOne({ where: { userId: user.id } });
    if (!vendor) throw new Error('Vendor not found');
    return this.payoutService.findByVendor(vendor.id, page, limit);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put(':id/status')
  async updateStatus(@Param('id') id: number, @Body() body: { status: string; paymentRef?: string }) {
    return this.payoutService.updateStatus(id, body.status, body.paymentRef);
  }
}
