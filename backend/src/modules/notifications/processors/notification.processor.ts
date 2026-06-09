import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from '../entities/notification.entity';

@Processor('notifications')
export class NotificationProcessor extends WorkerHost {
  constructor(
    @InjectModel(Notification) private notificationModel: typeof Notification,
  ) {
    super();
  }

  async process(job: Job<{ userId: number; type: string; title: string; message: string }>): Promise<any> {
    const { userId, type, title, message } = job.data;
    return this.notificationModel.create({ userId, type, title, message });
  }
}
