import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderStatusHistory } from './entities/order-status-history.entity';
import { Product } from '../products/entities/product.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderItem) private orderItemModel: typeof OrderItem,
    @InjectModel(OrderStatusHistory) private orderStatusHistoryModel: typeof OrderStatusHistory,
    @Inject('SEQUELIZE') private sequelize: Sequelize,
  ) {}

  async create(userId: number, cartItems: CartItem[], shippingAddress: object, paymentMethod: string) {
    if (!cartItems.length) throw new BadRequestException('Empty cart');

    const items = cartItems.map(ci => ({
      productId: ci.productId,
      productName: ci.product.name,
      productPrice: Number(ci.product.price),
      quantity: ci.quantity,
      subtotal: Number(ci.product.price) * ci.quantity,
    }));

    const subtotal = items.reduce((s, i) => s + i.subtotal, 0);

    const order = await this.sequelize.transaction(async (t) => {
      const created = await this.orderModel.create({
        orderNumber: 'ORD-' + Date.now(),
        userId,
        subtotal,
        total: subtotal,
        shippingAddress,
        paymentMethod,
        status: 'pending',
      }, { transaction: t });

      await this.orderItemModel.bulkCreate(
        items.map(i => ({ ...i, orderId: created.id })),
        { transaction: t },
      );

      await this.orderStatusHistoryModel.create({
        orderId: created.id,
        toStatus: 'pending',
        changedBy: userId,
      }, { transaction: t });

      for (const item of cartItems) {
        await Product.update(
          { stock: this.sequelize.literal('stock - ' + item.quantity) },
          { where: { id: item.productId }, transaction: t },
        );
      }

      return created;
    });

    return this.findById(order.id);
  }

  async findById(id: number) {
    const order = await this.orderModel.findByPk(id, {
      include: [OrderItem, OrderStatusHistory],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findByUser(userId: number, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.orderModel.findAndCountAll({
      where: { userId },
      include: [OrderItem],
      order: [['createdAt', 'DESC']],
      offset,
      limit,
    });
    return { orders: rows, total: count, page, totalPages: Math.ceil(count / limit) };
  }

  async updateStatus(orderId: number, status: string, changedBy: number) {
    const order = await this.findById(orderId);
    const validTransitions: Record<string, string[]> = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['processing', 'cancelled'],
      processing: ['shipped', 'cancelled'],
      shipped: ['delivered'],
      delivered: [],
      cancelled: [],
    };

    if (!validTransitions[order.status]?.includes(status)) {
      throw new BadRequestException('Invalid status transition');
    }

    await this.sequelize.transaction(async (t) => {
      await order.update({ status }, { transaction: t });
      await this.orderStatusHistoryModel.create({
        orderId,
        fromStatus: order.status,
        toStatus: status,
        changedBy,
      }, { transaction: t });
    });

    return this.findById(orderId);
  }

  async findAll(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.orderModel.findAndCountAll({
      include: [OrderItem, { model: this.sequelize.models.User, attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']],
      offset, limit,
    });
    return { orders: rows, total: count, page, totalPages: Math.ceil(count / limit) };
  }
}
