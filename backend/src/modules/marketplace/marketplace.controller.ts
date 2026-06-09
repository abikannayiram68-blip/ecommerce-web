import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MarketplaceService } from './marketplace.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('marketplace')
export class MarketplaceController {
  constructor(private marketplaceService: MarketplaceService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('disputes')
  async createDispute(@CurrentUser() user: any, @Body() body: any) {
    return this.marketplaceService.createDispute({ ...body, raisedBy: user.role === 'admin' ? 'admin' : 'buyer' });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('disputes/:id')
  async findDisputeById(@Param('id') id: number) {
    return this.marketplaceService.findDisputeById(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put('disputes/:id/resolve')
  async resolveDispute(@Param('id') id: number, @Body() body: { resolution: string; status: string }) {
    return this.marketplaceService.resolveDispute(id, body.resolution, body.status);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('messages')
  async sendMessage(@CurrentUser() user: any, @Body() body: any) {
    return this.marketplaceService.sendMessage({ ...body, userId: user.id });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('messages/:vendorId')
  async findMessagesByVendor(@Param('vendorId') vendorId: number) {
    return this.marketplaceService.findMessagesByVendor(vendorId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('messages/:id/read')
  async markMessageRead(@Param('id') id: number) {
    return this.marketplaceService.markMessageRead(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('messages/:vendorId/unread-count')
  async getUnreadCount(@Param('vendorId') vendorId: number) {
    const count = await this.marketplaceService.getUnreadCount(vendorId);
    return { count };
  }
}
