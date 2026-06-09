import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vendor } from './entities/vendor.entity';
import { VendorProduct } from './entities/vendor-product.entity';
import { Op } from 'sequelize';

@Injectable()
export class VendorService {
  constructor(
    @InjectModel(Vendor) private vendorModel: typeof Vendor,
    @InjectModel(VendorProduct) private vendorProductModel: typeof VendorProduct,
  ) {}

  async create(userId: number, data: Partial<Vendor>) {
    const existing = await this.vendorModel.findOne({ where: { userId } });
    if (existing) throw new BadRequestException('VENDOR_ALREADY_EXISTS');
    return this.vendorModel.create({ ...data, userId, status: 'pending' });
  }

  async findByUser(userId: number) {
    const vendor = await this.vendorModel.findOne({ where: { userId } });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return vendor;
  }

  async findById(id: number) {
    const vendor = await this.vendorModel.findByPk(id);
    if (!vendor) throw new NotFoundException('Vendor not found');
    return vendor;
  }

  async findBySlug(slug: string) {
    const vendor = await this.vendorModel.findOne({ where: { slug, status: 'active' } });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return vendor;
  }

  async update(id: number, data: Partial<Vendor>) {
    const vendor = await this.findById(id);
    return vendor.update(data);
  }

  async getDashboard(id: number) {
    const vendor = await this.vendorModel.findByPk(id, {
      include: [{ model: VendorProduct }],
    });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return vendor;
  }

  async findAll(page: number = 1, limit: number = 20) {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.vendorModel.findAndCountAll({
      where: { status: 'active' },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
    return { vendors: rows, total: count, page, limit };
  }
}
