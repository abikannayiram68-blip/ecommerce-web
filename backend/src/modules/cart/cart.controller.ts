import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CartService } from './cart.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCart(@CurrentUser() user: any) {
    return this.cartService.getCart(user.id);
  }

  @Post('items')
  async addItem(@CurrentUser() user: any, @Body() body: { productId: number; quantity: number }) {
    return this.cartService.addItem(user.id, body.productId, body.quantity || 1);
  }

  @Put('items/:id')
  async updateItem(@CurrentUser() user: any, @Param('id') id: number, @Body() body: { quantity: number }) {
    return this.cartService.updateItem(user.id, id, body.quantity);
  }

  @Delete('items/:id')
  async removeItem(@CurrentUser() user: any, @Param('id') id: number) {
    return this.cartService.removeItem(user.id, id);
  }

  @Delete()
  async clearCart(@CurrentUser() user: any) {
    return this.cartService.clearCart(user.id);
  }
}
