import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WishlistItem } from './entities/wishlist-item.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class WishlistService {
  constructor(@InjectModel(WishlistItem) private wishlistModel: typeof WishlistItem) {}

  async getWishlist(userId: number) {
    const items = await this.wishlistModel.findAll({
      where: { userId },
      include: [Product],
    });
    return { items };
  }

  async addItem(userId: number, productId: number) {
    const existing = await this.wishlistModel.findOne({ where: { userId, productId } });
    if (existing) throw new ConflictException('ALREADY_IN_WISHLIST');
    await this.wishlistModel.create({ userId, productId });
    return this.getWishlist(userId);
  }

  async removeItem(userId: number, productId: number) {
    const item = await this.wishlistModel.findOne({ where: { userId, productId } });
    if (!item) throw new NotFoundException('Wishlist item not found');
    await item.destroy();
    return this.getWishlist(userId);
  }

  async moveToCart(userId: number, productId: number) {
    await this.removeItem(userId, productId);
    return { moved: true, productId };
  }
}
