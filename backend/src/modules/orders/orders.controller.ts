import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';
import { CartService } from '../cart/cart.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private cartService: CartService,
  ) {}

  @Post()
  async create(@CurrentUser() user: any, @Body() body: { shippingAddress: object; paymentMethod: string }) {
    const cart = await this.cartService.getCart(user.id);
    return this.ordersService.create(user.id, cart.items as any, body.shippingAddress, body.paymentMethod);
  }

  @Get()
  async findByUser(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.ordersService.findByUser(user.id, page, limit);
  }

  @Get(':id')
  async findById(@CurrentUser() user: any, @Param('id') id: number) {
    const order = await this.ordersService.findById(id);
    if (order.userId !== user.id && user.role !== 'admin') {
      return { success: false, error: 'UNAUTHORIZED' };
    }
    return order;
  }

  @Get(':id/confirmation')
  async confirmation(@CurrentUser() user: any, @Param('id') id: number) {
    const order = await this.ordersService.findById(id);
    if (order.userId !== user.id) {
      return { success: false, error: 'UNAUTHORIZED' };
    }
    return { confirmation: { orderId: order.id, orderNumber: order.orderNumber, items: order.items, total: order.total } };
  }
}
