import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WishlistService } from './wishlist.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get()
  async getWishlist(@CurrentUser() user: any) {
    return this.wishlistService.getWishlist(user.id);
  }

  @Post('items')
  async addItem(@CurrentUser() user: any, @Body('productId') productId: number) {
    return this.wishlistService.addItem(user.id, productId);
  }

  @Delete('items/:productId')
  async removeItem(@CurrentUser() user: any, @Param('productId') productId: number) {
    return this.wishlistService.removeItem(user.id, productId);
  }

  @Post('items/:productId/move-to-cart')
  async moveToCart(@CurrentUser() user: any, @Param('productId') productId: number) {
    return this.wishlistService.moveToCart(user.id, productId);
  }
}
