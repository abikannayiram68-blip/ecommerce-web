import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Promotion } from './entities/promotion.entity';

@Injectable()
export class PromotionsService {
  constructor(@InjectModel(Promotion) private promotionModel: typeof Promotion) {}

  async findActive() {
    const now = new Date();
    return this.promotionModel.findAll({
      where: {
        isActive: true,
        startDate: { [Op.lte]: now },
        endDate: { [Op.gte]: now },
      },
    });
  }

  async create(data: Partial<Promotion>) {
    return this.promotionModel.create(data);
  }

  async update(id: number, data: Partial<Promotion>) {
    const promotion = await this.promotionModel.findByPk(id);
    if (promotion) await promotion.update(data);
    return promotion;
  }
}
