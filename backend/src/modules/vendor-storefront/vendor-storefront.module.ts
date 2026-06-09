import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VendorStorefrontService } from './vendor-storefront.service';
import { VendorStorefrontController } from './vendor-storefront.controller';
import { Vendor } from '../vendor/entities/vendor.entity';
import { VendorProduct } from '../vendor/entities/vendor-product.entity';

@Module({
  imports: [SequelizeModule.forFeature([Vendor, VendorProduct])],
  controllers: [VendorStorefrontController],
  providers: [VendorStorefrontService],
  exports: [VendorStorefrontService],
})
export class VendorStorefrontModule {}
