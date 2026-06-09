import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { OrdersService } from '../../src/modules/orders/orders.service';
import { Order } from '../../src/modules/orders/entities/order.entity';
import { OrderItem } from '../../src/modules/orders/entities/order-item.entity';
import { OrderStatusHistory } from '../../src/modules/orders/entities/order-status-history.entity';
import { Sequelize } from 'sequelize-typescript';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderModel: any;

  beforeEach(async () => {
    orderModel = {
      findByPk: jest.fn(),
      findAndCountAll: jest.fn(),
      create: jest.fn(),
    };

    const mockSequelize = { transaction: jest.fn(), literal: jest.fn(), models: { User: {} }, fn: jest.fn(), col: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getModelToken(Order), useValue: orderModel },
        { provide: getModelToken(OrderItem), useValue: {} },
        { provide: getModelToken(OrderStatusHistory), useValue: {} },
        { provide: Sequelize, useValue: mockSequelize },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should find order by id', async () => {
    const mockOrder = { id: 1, orderNumber: 'ORD-1', userId: 1, total: 100 };
    orderModel.findByPk.mockResolvedValue(mockOrder);
    const result = await service.findById(1);
    expect(result.id).toBe(1);
  });

  it('should throw on non-existent order', async () => {
    orderModel.findByPk.mockResolvedValue(null);
    await expect(service.findById(999)).rejects.toThrow();
  });
});
