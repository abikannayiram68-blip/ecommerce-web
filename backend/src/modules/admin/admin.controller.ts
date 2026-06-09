import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../categories/categories.service';
import { OrdersService } from '../orders/orders.service';
import { UsersService } from '../users/users.service';
import { VendorService } from '../vendor/vendor.service';
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
    private vendorService: VendorService,
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

  @Get('users')
  async listUsers() {
    return this.usersService.findAll();
  }

  @Get('users/:id')
  async getUser(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Post('users')
  async createUser(@Body() body: any) {
    // In a real app we'd hash passwords here, but for this demo using create is fine
    return this.usersService.create(body);
  }

  @Put('users/:id/role')
  async updateUserRole(@Param('id') id: number, @Body('role') role: string) {
    return this.usersService.update(id, { role });
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Get('vendors')
  async listVendors() {
    return this.vendorService.findAll(1, 100);
  }

  @Put('vendors/:id/status')
  async updateVendorStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.vendorService.update(id, { status } as any);
  }
}
