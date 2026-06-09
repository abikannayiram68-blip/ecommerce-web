import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { RecommendationsService } from '../../src/modules/recommendations/recommendations.service';
import { RecentlyViewed } from '../../src/modules/recommendations/entities/recently-viewed.entity';
import { ProductsService } from '../../src/modules/products/products.service';

describe('Phase 2: RecommendationsService', () => {
  let service: RecommendationsService;

  const mockRecentlyViewed = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({}),
    count: jest.fn().mockResolvedValue(0),
  };

  const mockProductsService = {
    findAll: jest.fn().mockResolvedValue({ products: [], total: 0 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecommendationsService,
        { provide: ProductsService, useValue: mockProductsService },
        { provide: getModelToken(RecentlyViewed), useValue: mockRecentlyViewed },
      ],
    }).compile();
    service = module.get<RecommendationsService>(RecommendationsService);
  });

  it('UT-019-01: Get suggestions for user with browsing history', async () => {
    mockProductsService.findAll.mockResolvedValue({
      products: [{ id: 1, name: 'Product A' }],
      total: 1,
    });
    const result = await service.getRecommendations(1);
    expect(result).toBeDefined();
  });

  it('UT-018-01: Track view adds to recently viewed', async () => {
    await service.trackView(1, 10);
    expect(mockRecentlyViewed.findOne).toHaveBeenCalled();
    expect(mockRecentlyViewed.create).toHaveBeenCalledWith({ userId: 1, productId: 10 });
  });

  it('UT-018-02: Get recently viewed returns ordered list', async () => {
    await service.getRecentlyViewed(1);
    expect(mockRecentlyViewed.findAll).toHaveBeenCalledWith({
      where: { userId: 1 },
      order: [['createdAt', 'DESC']],
      limit: 20,
    });
  });
});
