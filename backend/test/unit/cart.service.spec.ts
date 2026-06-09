import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { CartService } from '../../src/modules/cart/cart.service';
import { CartItem } from '../../src/modules/cart/entities/cart-item.entity';

describe('CartService', () => {
  let service: CartService;
  let cartModel: any;

  beforeEach(async () => {
    cartModel = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      destroy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        { provide: getModelToken(CartItem), useValue: cartModel },
        { provide: 'ProductsService', useValue: {} },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should return empty cart for user', async () => {
    cartModel.findAll.mockResolvedValue([]);
    const result = await service.getCart(1);
    expect(result.items).toHaveLength(0);
    expect(result.total).toBe(0);
  });
});
