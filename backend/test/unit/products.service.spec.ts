import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { ProductsService } from '../../src/modules/products/products.service';
import { Product } from '../../src/modules/products/entities/product.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  let productModel: any;

  const mockProducts = [
    { id: 1, name: 'Headphones', price: 149.99, stock: 50, isActive: true },
    { id: 2, name: 'Mouse', price: 29.99, stock: 100, isActive: true },
  ];

  beforeEach(async () => {
    productModel = {
      findAndCountAll: jest.fn(),
      findOne: jest.fn(),
      findByPk: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getModelToken(Product), useValue: productModel },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should return paginated products', async () => {
    productModel.findAndCountAll.mockResolvedValue({ rows: mockProducts, count: 2 });
    const result = await service.findAll({ page: 1, limit: 20 });
    expect(result.products).toHaveLength(2);
    expect(result.total).toBe(2);
    expect(result.page).toBe(1);
  });

  it('should return empty result for no products', async () => {
    productModel.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });
    const result = await service.findAll({ page: 1, limit: 20 });
    expect(result.products).toHaveLength(0);
    expect(result.total).toBe(0);
  });

  it('should find product by slug', async () => {
    productModel.findOne.mockResolvedValue(mockProducts[0]);
    const result = await service.findBySlug('headphones');
    expect(result.name).toBe('Headphones');
  });

  it('should throw on non-existent slug', async () => {
    productModel.findOne.mockResolvedValue(null);
    await expect(service.findBySlug('nonexistent')).rejects.toThrow();
  });
});
