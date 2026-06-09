import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Referral } from './entities/referral.entity';

@Injectable()
export class ReferralService {
  constructor(@InjectModel(Referral) private referralModel: typeof Referral) {}

  async create(referrerId: number, refereeId: number) {
    const referral = await this.referralModel.create({ referrerId, refereeId, status: 'pending', rewardPoints: 0 });
    return referral;
  }

  async getReferrals(userId: number) {
    return this.referralModel.findAll({ where: { referrerId: userId }, order: [['createdAt', 'DESC']] });
  }

  async getRewards(userId: number) {
    const referrals = await this.referralModel.findAll({ where: { referrerId: userId, status: 'completed' } });
    const totalRewards = referrals.reduce((sum, r) => sum + r.rewardPoints, 0);
    return { totalRewards, referralCount: referrals.length };
  }
}
