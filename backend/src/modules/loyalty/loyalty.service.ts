import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoyaltyPoint } from './entities/loyalty-point.entity';

@Injectable()
export class LoyaltyService {
  constructor(@InjectModel(LoyaltyPoint) private loyaltyPointModel: typeof LoyaltyPoint) {}

  async getPoints(userId: number) {
    const record = await this.loyaltyPointModel.findOne({ where: { userId } });
    return record || { userId, points: 0, balance: 0 };
  }

  async addPoints(userId: number, points: number, reason: string) {
    const [record] = await this.loyaltyPointModel.findOrCreate({ where: { userId }, defaults: { userId, points: 0, balance: 0, reason: '' } });
    record.points += points;
    record.balance += points;
    if (reason) record.reason = reason;
    await record.save();
    return record;
  }
}
