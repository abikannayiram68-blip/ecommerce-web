import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async findAll(query: { page?: number; limit?: number; categoryId?: number; minPrice?: number; maxPrice?: number; sortBy?: string; sortOrder?: string; search?: string }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const offset = (page - 1) * limit;
    const where: any = { isActive: true };

    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.minPrice || query.maxPrice) {
      where.price = {};
      if (query.minPrice) where.price[Op.gte] = query.minPrice;
      if (query.maxPrice) where.price[Op.lte] = query.maxPrice;
    }
    if (query.search) {
      where.name = { [Op.like]: `%${query.search}%` };
    }

    const order: any[] = [];
    if (query.sortBy) {
      order.push([query.sortBy, query.sortOrder || 'ASC']);
    }

    const { rows, count } = await this.productModel.findAndCountAll({
      where,
      order,
      offset,
      limit,
      include: [{ model: ProductImage }, { model: Category, attributes: ['id', 'name', 'slug'] }],
    });

    return { products: rows, total: count, page, totalPages: Math.ceil(count / limit) };
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productModel.findOne({
      where: { slug, isActive: true },
      include: [{ model: ProductImage }, { model: Category, attributes: ['id', 'name', 'slug'] }],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async search(query: string) {
    return this.findAll({ search: query, page: 1, limit: 20 });
  }

  async create(data: any) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
    return this.productModel.create({ ...data, slug });
  }

  async update(id: number, data: any) {
    const product = await this.productModel.findByPk(id);
    if (!product) throw new NotFoundException('Product not found');
    return product.update(data);
  }

  async archive(id: number) {
    const product = await this.productModel.findByPk(id);
    if (!product) throw new NotFoundException('Product not found');
    return product.update({ isActive: false });
  }

  async findAllAdmin(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.productModel.findAndCountAll({
      offset, limit,
      include: [ProductImage, Category],
      order: [['createdAt', 'DESC']],
    });
    return { products: rows, total: count, page, totalPages: Math.ceil(count / limit) };
  }
}
