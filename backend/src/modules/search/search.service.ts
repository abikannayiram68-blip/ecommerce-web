import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
  ) {}

  async voiceSearch(transcript: string) {
    return this.search(transcript);
  }

  async visualSearch(imageUrl: string) {
    return { query: imageUrl, message: 'Visual search received. Processing image...', results: [] };
  }

  async search(query: string, filters?: { categoryId?: number; minPrice?: number; maxPrice?: number }) {
    const where: any = { isActive: true };
    const words = query.trim().split(/\s+/).filter(Boolean);

    if (words.length > 0) {
      where[Op.or] = words.map((word) => ({
        [Op.or]: [
          { name: { [Op.like]: `%${word}%` } },
          { description: { [Op.like]: `%${word}%` } },
        ],
      }));
    }

    if (filters?.categoryId) where.categoryId = filters.categoryId;
    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      where.price = {};
      if (filters?.minPrice !== undefined) where.price[Op.gte] = filters.minPrice;
      if (filters?.maxPrice !== undefined) where.price[Op.lte] = filters.maxPrice;
    }

    const products = await this.productModel.findAll({ where, limit: 20 });
    return { query, filters, results: products, suggestion: null };
  }
}
