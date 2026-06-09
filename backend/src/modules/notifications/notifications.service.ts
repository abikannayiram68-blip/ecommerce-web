import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification) private notificationModel: typeof Notification) {}

  async findByUser(userId: number) {
    return this.notificationModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }

  async unreadCount(userId: number) {
    const count = await this.notificationModel.count({ where: { userId, isRead: false } });
    return { count };
  }

  async markAsRead(userId: number, notificationId: number) {
    const notification = await this.notificationModel.findOne({ where: { id: notificationId, userId } });
    if (notification) {
      await notification.update({ isRead: true });
    }
    return this.findByUser(userId);
  }

  async create(data: Partial<Notification>) {
    return this.notificationModel.create(data);
  }
}
