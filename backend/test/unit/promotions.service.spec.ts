import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { PromotionsService } from '../../src/modules/promotions/promotions.service';
import { Promotion } from '../../src/modules/promotions/entities/promotion.entity';

describe('UT-022: PromotionsService', () => {
  let service: PromotionsService;

  const mockPromotionModel = {
    findAll: jest.fn().mockResolvedValue([]),
    findByPk: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromotionsService,
        { provide: getModelToken(Promotion), useValue: mockPromotionModel },
      ],
    }).compile();
    service = module.get<PromotionsService>(PromotionsService);
  });

  it('UT-022-01: Get active promotions', async () => {
    mockPromotionModel.findAll.mockResolvedValue([
      { id: 1, name: 'Summer Sale', isActive: true, startDate: new Date('2026-01-01'), endDate: new Date('2026-12-31') },
    ]);
    const result = await service.findActive();
    expect(result).toHaveLength(1);
  });

  it('UT-030-01: Create promotion', async () => {
    const data = { name: 'Test Promo', type: 'percentage', value: 10, startDate: new Date(), endDate: new Date() };
    mockPromotionModel.create.mockResolvedValue({ id: 1, ...data });
    const result = await service.create(data);
    expect(mockPromotionModel.create).toHaveBeenCalledWith(data);
  });
});
