import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { Vendor } from './entities/vendor.entity';
import { VendorProduct } from './entities/vendor-product.entity';
import { Product } from '../products/entities/product.entity';
import { ProductImage } from '../products/entities/product-image.entity';

import { MinioModule } from '../minio/minio.module';

@Module({
  imports: [SequelizeModule.forFeature([Vendor, VendorProduct, Product, ProductImage]), MinioModule],
  controllers: [VendorController],
  providers: [VendorService],
  exports: [VendorService],
})
export class VendorModule {}
