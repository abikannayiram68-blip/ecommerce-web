import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsService } from '../products/products.service';
import { RecentlyViewed } from './entities/recently-viewed.entity';

@Injectable()
export class RecommendationsService {
  constructor(
    private productsService: ProductsService,
    @InjectModel(RecentlyViewed) private recentlyViewedModel: typeof RecentlyViewed,
  ) {}

  async getRecommendations(userId: number) {
    return this.productsService.findAll({ page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'DESC' });
  }

  async getTrending() {
    return this.productsService.findAll({ page: 1, limit: 10, sortBy: 'reviewCount', sortOrder: 'DESC' });
  }

  async getRelated(productId: number) {
    return this.productsService.findAll({ page: 1, limit: 6 });
  }

  async trackView(userId: number, productId: number) {
    const existing = await this.recentlyViewedModel.findOne({ where: { userId, productId } });
    if (existing) {
      await existing.destroy();
    }
    await this.recentlyViewedModel.create({ userId, productId });
    const count = await this.recentlyViewedModel.count({ where: { userId } });
    if (count > 20) {
      const oldest = await this.recentlyViewedModel.findAll({
        where: { userId },
        order: [['createdAt', 'ASC']],
        limit: count - 20,
      });
      for (const item of oldest) {
        await item.destroy();
      }
    }
  }

  async getRecentlyViewed(userId: number) {
    return this.recentlyViewedModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 20,
    });
  }
}
