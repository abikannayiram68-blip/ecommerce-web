import { Controller, Get, Param, Query } from '@nestjs/common';
import { VendorStorefrontService } from './vendor-storefront.service';

@Controller('stores')
export class VendorStorefrontController {
  constructor(private storefrontService: VendorStorefrontService) {}

  @Get('search')
  async search(@Query('q') q: string) {
    return this.storefrontService.searchStores(q);
  }

  @Get(':slug')
  async getStore(@Param('slug') slug: string) {
    return this.storefrontService.getStorefront(slug);
  }

  @Get(':slug/products')
  async getProducts(@Param('slug') slug: string, @Query('page') page?: number, @Query('limit') limit?: number, @Query('categoryId') categoryId?: number) {
    const vendor = await this.storefrontService.getStorefront(slug);
    return this.storefrontService.getStoreProducts(vendor.id, page, limit, categoryId);
  }
}
