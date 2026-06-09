import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './entities/cart-item.entity';
import { Product } from '../products/entities/product.entity';
import { ProductImage } from '../products/entities/product-image.entity';

@Injectable()
export class CartService {
  constructor(@InjectModel(CartItem) private cartItemModel: typeof CartItem) {}

  async getCart(userId: number) {
    const items = await this.cartItemModel.findAll({
      where: { userId },
      include: [{ model: Product, include: [ProductImage] }],
    });
    const total = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
    return { items, total };
  }

  async addItem(userId: number, productId: number, quantity: number) {
    const existing = await this.cartItemModel.findOne({ where: { userId, productId } });
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return this.getCart(userId);
    }
    await this.cartItemModel.create({ userId, productId, quantity });
    return this.getCart(userId);
  }

  async updateItem(userId: number, itemId: number, quantity: number) {
    const item = await this.cartItemModel.findOne({ where: { id: itemId, userId } });
    if (!item) throw new NotFoundException('Cart item not found');
    item.quantity = quantity;
    await item.save();
    return this.getCart(userId);
  }

  async removeItem(userId: number, itemId: number) {
    const item = await this.cartItemModel.findOne({ where: { id: itemId, userId } });
    if (!item) throw new NotFoundException('Cart item not found');
    await item.destroy();
    return this.getCart(userId);
  }

  async clearCart(userId: number) {
    await this.cartItemModel.destroy({ where: { userId } });
    return { items: [], total: 0 };
  }
}
