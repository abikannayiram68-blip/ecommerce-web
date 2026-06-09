import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payout } from './entities/payout.entity';
import { Vendor } from '../vendor/entities/vendor.entity';
import { Op } from 'sequelize';

@Injectable()
export class PayoutService {
  constructor(
    @InjectModel(Payout) private payoutModel: typeof Payout,
    @InjectModel(Vendor) private vendorModel: typeof Vendor,
  ) {}

  async findByVendor(vendorId: number, page: number = 1, limit: number = 20) {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.payoutModel.findAndCountAll({
      where: { vendorId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
    return { payouts: rows, total: count, page, limit };
  }

  async findById(id: number) {
    const payout = await this.payoutModel.findByPk(id);
    if (!payout) throw new NotFoundException('Payout not found');
    return payout;
  }

  async request(vendorId: number, amount: number) {
    const vendor = await this.vendorModel.findByPk(vendorId);
    if (!vendor) throw new NotFoundException('Vendor not found');

    const pendingTotal = await this.payoutModel.sum('amount', {
      where: { vendorId, status: { [Op.in]: ['pending', 'processing'] } },
    });
    if (Number(pendingTotal || 0) + amount > Number(vendor.totalSales) - Number(vendor.totalPayout)) {
      throw new BadRequestException('INSUFFICIENT_BALANCE');
    }

    return this.payoutModel.create({ vendorId, amount, status: 'pending' });
  }

  async updateStatus(id: number, status: string, paymentRef?: string) {
    const payout = await this.findById(id);
    const updates: any = { status };
    if (status === 'completed') updates.paidAt = new Date();
    if (paymentRef) updates.paymentRef = paymentRef;
    return payout.update(updates);
  }

  async findAll(status?: string, page: number = 1, limit: number = 20) {
    const where: any = {};
    if (status) where.status = status;
    const offset = (page - 1) * limit;
    const { rows, count } = await this.payoutModel.findAndCountAll({
      where,
      include: [{ model: Vendor, attributes: ['id', 'storeName', 'email'] }],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
    return { payouts: rows, total: count, page, limit };
  }
}
