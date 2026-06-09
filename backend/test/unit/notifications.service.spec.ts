import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { NotificationsService } from '../../src/modules/notifications/notifications.service';
import { Notification } from '../../src/modules/notifications/entities/notification.entity';

describe('UT-021: NotificationsService', () => {
  let service: NotificationsService;

  const mockNotificationModel = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: getModelToken(Notification), useValue: mockNotificationModel },
      ],
    }).compile();
    service = module.get<NotificationsService>(NotificationsService);
  });

  it('UT-021-01: Get user notifications', async () => {
    mockNotificationModel.findAll.mockResolvedValue([
      { id: 1, type: 'order_update', message: 'Order shipped', isRead: false, createdAt: new Date() },
    ]);
    const result = await service.findByUser(1);
    expect(result).toHaveLength(1);
    expect(mockNotificationModel.findAll).toHaveBeenCalledWith({
      where: { userId: 1 },
      order: [['createdAt', 'DESC']],
    });
  });

  it('UT-021-02: Mark notification as read', async () => {
    const mockUpdate = jest.fn();
    mockNotificationModel.findOne.mockResolvedValue({ id: 5, isRead: false, update: mockUpdate });
    await service.markAsRead(1, 5);
    expect(mockUpdate).toHaveBeenCalledWith({ isRead: true });
  });
});
