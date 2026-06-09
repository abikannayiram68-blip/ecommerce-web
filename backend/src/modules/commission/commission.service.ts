import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CommissionPlan } from './entities/commission-plan.entity';

@Injectable()
export class CommissionService {
  constructor(
    @InjectModel(CommissionPlan) private planModel: typeof CommissionPlan,
  ) {}

  async findAll() {
    return this.planModel.findAll({ order: [['rate', 'ASC']] });
  }

  async findById(id: number) {
    const plan = await this.planModel.findByPk(id);
    if (!plan) throw new NotFoundException('Commission plan not found');
    return plan;
  }

  async create(data: Partial<CommissionPlan>) {
    if (data.isDefault) {
      await this.planModel.update({ isDefault: false }, { where: { isDefault: true } });
    }
    return this.planModel.create(data);
  }

  async update(id: number, data: Partial<CommissionPlan>) {
    const plan = await this.findById(id);
    if (data.isDefault) {
      await this.planModel.update({ isDefault: false }, { where: { isDefault: true } });
    }
    return plan.update(data);
  }

  async getDefault() {
    const plan = await this.planModel.findOne({ where: { isDefault: true } });
    if (!plan) throw new NotFoundException('No default commission plan');
    return plan;
  }

  async calculate(amount: number, planId?: number) {
    const plan = planId ? await this.findById(planId) : await this.getDefault();
    const commission = (amount * Number(plan.rate)) / 100;
    return { amount, rate: plan.rate, commission, netAmount: amount - commission };
  }
}
