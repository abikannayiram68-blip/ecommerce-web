import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Dispute } from './entities/dispute.entity';
import { VendorMessage } from './entities/vendor-message.entity';
import { Vendor } from '../vendor/entities/vendor.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectModel(Dispute) private disputeModel: typeof Dispute,
    @InjectModel(VendorMessage) private messageModel: typeof VendorMessage,
  ) {}

  async createDispute(data: Partial<Dispute>) {
    return this.disputeModel.create(data);
  }

  async findDisputesByVendor(vendorId: number) {
    return this.disputeModel.findAll({
      where: { vendorId },
      order: [['createdAt', 'DESC']],
    });
  }

  async findDisputeById(id: number) {
    const dispute = await this.disputeModel.findByPk(id);
    if (!dispute) throw new NotFoundException('Dispute not found');
    return dispute;
  }

  async resolveDispute(id: number, resolution: string, status: string) {
    const dispute = await this.findDisputeById(id);
    return dispute.update({ resolution, status });
  }

  async sendMessage(data: Partial<VendorMessage>) {
    return this.messageModel.create(data);
  }

  async findMessagesByVendor(vendorId: number) {
    return this.messageModel.findAll({
      where: { vendorId },
      include: [{ model: User, attributes: ['id', 'name', 'avatar'] }],
      order: [['createdAt', 'ASC']],
    });
  }

  async markMessageRead(id: number) {
    const message = await this.messageModel.findByPk(id);
    if (!message) throw new NotFoundException('Message not found');
    return message.update({ read: true });
  }

  async getUnreadCount(vendorId: number) {
    return this.messageModel.count({ where: { vendorId, read: false, direction: 'to_vendor' } });
  }
}
