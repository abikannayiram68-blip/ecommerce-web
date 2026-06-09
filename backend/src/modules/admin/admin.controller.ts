import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../categories/categories.service';
import { OrdersService } from '../orders/orders.service';
import { UsersService } from '../users/users.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@UseGuards(AuthGuard('jwt'))
@Roles('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private ordersService: OrdersService,
    private usersService: UsersService,
  ) {}

  @Get('dashboard')
  async getDashboard() {
    return this.adminService.getDashboard();
  }

  @Post('products')
  async createProduct(@Body() body: any) {
    return this.productsService.create(body);
  }

  @Put('products/:id')
  async updateProduct(@Param('id') id: number, @Body() body: any) {
    return this.productsService.update(id, body);
  }

  @Delete('products/:id')
  async archiveProduct(@Param('id') id: number) {
    return this.productsService.archive(id);
  }

  @Post('categories')
  async createCategory(@Body() body: any) {
    return this.categoriesService.create(body);
  }

  @Put('orders/:id/status')
  async updateOrderStatus(@Param('id') id: number, @Body('status') status: string, @CurrentUser() user: any) {
    return this.ordersService.updateStatus(id, status, user.id);
  }

  @Get('orders')
  async listOrders(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.ordersService.findAll(page, limit);
  }

  @Get('customers')
  async listCustomers() {
    return this.usersService.findAll();
  }

  @Get('customers/:id')
  async getCustomer(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
}
