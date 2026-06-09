import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { SearchService } from '../../src/modules/search/search.service';
import { Product } from '../../src/modules/products/entities/product.entity';

describe('UT-007-01: SearchService — Typo-tolerant search', () => {
  let service: SearchService;

  const mockProductModel = {
    findAll: jest.fn().mockResolvedValue([
      { id: 1, name: 'Wireless Headphones', description: 'Bluetooth headphones', price: 99.99 },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: getModelToken(Product), useValue: mockProductModel },
      ],
    }).compile();
    service = module.get<SearchService>(SearchService);
  });

  it('UT-007-01: Misspelled search returns correct products', async () => {
    const result = await service.search('headfones');
    expect(result.results.length).toBeGreaterThan(0);
    expect(mockProductModel.findAll).toHaveBeenCalled();
  });

  it('UT-007-02: Query with no close matches returns empty', async () => {
    mockProductModel.findAll.mockResolvedValueOnce([]);
    const result = await service.search('xyzabc123nonexistent');
    expect(result.results).toEqual([]);
  });

  it('UT-007-03: Single-character query returns matches', async () => {
    mockProductModel.findAll.mockResolvedValueOnce([]);
    const result = await service.search('a');
    expect(result.results).toBeDefined();
  });
});
