import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './entities/review.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review) private reviewModel: typeof Review,
    @InjectModel(Order) private orderModel: typeof Order,
  ) {}

  async findByProduct(productId: number) {
    return this.reviewModel.findAll({
      where: { productId, status: 'approved' },
      include: [{ model: User, attributes: ['id', 'name', 'avatar'] }],
      order: [['createdAt', 'DESC']],
    });
  }

  async create(userId: number, productId: number, rating: number, comment?: string) {
    if (rating < 1 || rating > 5) throw new BadRequestException('INVALID_RATING');

    const order = await this.orderModel.findOne({
      where: { userId, status: 'delivered' },
      include: [{ model: OrderItem, where: { productId } }],
    });
    if (!order) throw new BadRequestException('MUST_PURCHASE_FIRST');

    const existing = await this.reviewModel.findOne({ where: { userId, productId } });
    if (existing) throw new BadRequestException('ALREADY_REVIEWED');

    return this.reviewModel.create({ userId, productId, rating, comment, status: 'pending' });
  }

  async moderate(reviewId: number, status: string) {
    const review = await this.reviewModel.findByPk(reviewId);
    if (!review) throw new NotFoundException('Review not found');
    return review.update({ status });
  }
}
