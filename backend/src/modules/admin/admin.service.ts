import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async getDashboard() {
    const totalProducts = await this.productModel.count({ where: { isActive: true } });
    const totalOrders = await this.orderModel.count();
    const totalCustomers = await this.userModel.count({ where: { role: 'customer' } });
    const lowStockCount = await this.productModel.count({ where: { stock: { [require('sequelize').Op.lte]: 10 }, isActive: true } });
    const totalRevenueResult = await this.orderModel.findOne({
      attributes: [[this.orderModel.sequelize!.fn('SUM', this.orderModel.sequelize!.col('total')), 'totalRevenue']],
      where: { status: { [require('sequelize').Op.notIn]: ['cancelled'] } },
    }) as any;

    return {
      totalProducts,
      totalOrders,
      totalCustomers,
      lowStockCount,
      totalRevenue: totalRevenueResult?.dataValues?.totalRevenue || 0,
    };
  }
}
