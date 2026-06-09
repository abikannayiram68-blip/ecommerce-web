import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaxRate } from './entities/tax-rate.entity';

@Injectable()
export class TaxService {
  constructor(
    @InjectModel(TaxRate) private taxModel: typeof TaxRate,
  ) {}

  async findAll() {
    return this.taxModel.findAll({ where: { isActive: true }, order: [['countryCode', 'ASC']] });
  }

  async findById(id: number) {
    const tax = await this.taxModel.findByPk(id);
    if (!tax) throw new NotFoundException('Tax rate not found');
    return tax;
  }

  async findByCountry(countryCode: string) {
    const rates = await this.taxModel.findAll({
      where: { countryCode: countryCode.toUpperCase(), isActive: true },
    });
    return rates;
  }

  async create(data: Partial<TaxRate>) {
    return this.taxModel.create(data);
  }

  async update(id: number, data: Partial<TaxRate>) {
    const tax = await this.findById(id);
    return tax.update(data);
  }

  async calculate(amount: number, countryCode: string, region?: string) {
    const where: any = { countryCode: countryCode.toUpperCase(), isActive: true };
    if (region) where.region = region;
    const rates = await this.taxModel.findAll({ where });
    const totalRate = rates.reduce((sum, r) => sum + Number(r.rate), 0);
    const taxAmount = (amount * totalRate) / 100;
    return { amount, countryCode, region, totalRate, taxAmount, totalWithTax: amount + taxAmount };
  }
}
