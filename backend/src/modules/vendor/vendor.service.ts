import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vendor } from './entities/vendor.entity';
import { VendorProduct } from './entities/vendor-product.entity';
import { Product } from '../products/entities/product.entity';
import { ProductImage } from '../products/entities/product-image.entity';
import { Op } from 'sequelize';

import { MinioService } from '../minio/minio.service';

@Injectable()
export class VendorService {
  constructor(
    @InjectModel(Vendor) private vendorModel: typeof Vendor,
    @InjectModel(VendorProduct) private vendorProductModel: typeof VendorProduct,
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(ProductImage) private productImageModel: typeof ProductImage,
    private minioService: MinioService,
  ) {}

  async createProduct(vendorId: number, data: any, file?: Express.Multer.File) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
    
    // Create product
    const product = await this.productModel.create({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      categoryId: data.categoryId,
      sku: data.sku || `V${vendorId}-${Date.now()}`,
      slug,
      isActive: true,
    });

    // Create mapping
    await this.vendorProductModel.create({
      vendorId,
      productId: product.id,
      price: data.price,
      stock: data.stock,
      status: 'active',
    });

    // Create product image if uploaded
    if (file) {
      const { url, key } = await this.minioService.uploadFile(file);
      await this.productImageModel.create({
        productId: product.id,
        imageUrl: url,
        imageKey: key,
        altText: data.name,
        isPrimary: true,
      });
    }

    return product;
  }

  async create(userId: number, data: Partial<Vendor>) {
    const existing = await this.vendorModel.findOne({ where: { userId } });
    if (existing) throw new BadRequestException('VENDOR_ALREADY_EXISTS');
    return this.vendorModel.create({ ...data, userId, status: 'pending' });
  }

  async findByUser(userId: number) {
    const vendor = await this.vendorModel.findOne({ where: { userId } });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return vendor;
  }

  async findById(id: number) {
    const vendor = await this.vendorModel.findByPk(id);
    if (!vendor) throw new NotFoundException('Vendor not found');
    return vendor;
  }

  async findBySlug(slug: string) {
    const vendor = await this.vendorModel.findOne({ where: { slug, status: 'active' } });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return vendor;
  }

  async update(id: number, data: Partial<Vendor>) {
    const vendor = await this.findById(id);
    return vendor.update(data);
  }

  async getDashboard(id: number) {
    const vendor = await this.vendorModel.findByPk(id, {
      include: [{ model: VendorProduct }],
    });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return vendor;
  }

  async findAll(page: number = 1, limit: number = 20) {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.vendorModel.findAndCountAll({
      where: { status: 'active' },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
    return { vendors: rows, total: count, page, limit };
  }
}
