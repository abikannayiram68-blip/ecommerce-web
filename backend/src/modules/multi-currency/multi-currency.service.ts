import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Currency } from './entities/currency.entity';

@Injectable()
export class MultiCurrencyService {
  constructor(
    @InjectModel(Currency) private currencyModel: typeof Currency,
  ) {}

  async findAll() {
    return this.currencyModel.findAll({ where: { isActive: true }, order: [['code', 'ASC']] });
  }

  async findById(id: number) {
    const currency = await this.currencyModel.findByPk(id);
    if (!currency) throw new NotFoundException('Currency not found');
    return currency;
  }

  async findByCode(code: string) {
    const currency = await this.currencyModel.findOne({ where: { code: code.toUpperCase(), isActive: true } });
    if (!currency) throw new NotFoundException('Currency not found');
    return currency;
  }

  async create(data: Partial<Currency>) {
    if (data.isBase) {
      await this.currencyModel.update({ isBase: false }, { where: { isBase: true } });
    }
    return this.currencyModel.create({ ...data, code: data.code?.toUpperCase() });
  }

  async update(id: number, data: Partial<Currency>) {
    const currency = await this.findById(id);
    if (data.isBase) {
      await this.currencyModel.update({ isBase: false }, { where: { isBase: true } });
    }
    return currency.update(data);
  }

  async convert(amount: number, fromCode: string, toCode: string) {
    const from = await this.findByCode(fromCode);
    const to = await this.findByCode(toCode);
    const baseAmount = amount * Number(from.exchangeRate);
    const converted = baseAmount / Number(to.exchangeRate);
    return { amount, from: fromCode, to: toCode, converted, rate: Number(to.exchangeRate) / Number(from.exchangeRate) };
  }

  async getBase() {
    const base = await this.currencyModel.findOne({ where: { isBase: true } });
    if (!base) throw new NotFoundException('No base currency set');
    return base;
  }
}
