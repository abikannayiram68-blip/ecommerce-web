import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vendor } from '../vendor/entities/vendor.entity';
import { VendorProduct } from '../vendor/entities/vendor-product.entity';
import { Product } from '../products/entities/product.entity';
import { ProductImage } from '../products/entities/product-image.entity';
import { Op } from 'sequelize';

@Injectable()
export class VendorStorefrontService {
  constructor(
    @InjectModel(Vendor) private vendorModel: typeof Vendor,
    @InjectModel(VendorProduct) private vendorProductModel: typeof VendorProduct,
  ) {}

  async getStorefront(slug: string) {
    const vendor = await this.vendorModel.findOne({
      where: { slug, status: 'active' },
    });
    if (!vendor) throw new NotFoundException('Store not found');
    return vendor;
  }

  async getStoreProducts(vendorId: number, page: number = 1, limit: number = 20, categoryId?: number) {
    const where: any = { vendorId, status: 'active' };
    const offset = (page - 1) * limit;
    const { rows, count } = await this.vendorProductModel.findAndCountAll({
      where,
      include: [{ model: Product, where: categoryId ? { categoryId } : {}, include: [{ model: ProductImage }] }],
      limit,
      offset,
    });
    return { products: rows, total: count, page, limit };
  }

  async searchStores(query: string) {
    return this.vendorModel.findAll({
      where: {
        status: 'active',
        [Op.or]: [
          { storeName: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
        ],
      },
      limit: 20,
    });
  }
}
