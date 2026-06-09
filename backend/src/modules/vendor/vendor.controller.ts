import { Controller, Get, Post, Put, Param, Body, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VendorService } from './vendor.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('vendors')
export class VendorController {
  constructor(private vendorService: VendorService) {}

  @Get()
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 20) {
    return this.vendorService.findAll(page, limit);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.vendorService.findById(id);
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.vendorService.findBySlug(slug);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  async register(@CurrentUser() user: any, @Body() body: any) {
    return this.vendorService.create(user.id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my/profile')
  async myProfile(@CurrentUser() user: any) {
    return this.vendorService.findByUser(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my/dashboard')
  async myDashboard(@CurrentUser() user: any) {
    const vendor = await this.vendorService.findByUser(user.id);
    return this.vendorService.getDashboard(vendor.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('my/profile')
  async updateProfile(@CurrentUser() user: any, @Body() body: any) {
    const vendor = await this.vendorService.findByUser(user.id);
    return this.vendorService.update(vendor.id, body);
  }
}
