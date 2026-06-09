import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SearchModule } from '../../src/modules/search/search.module';
import { SearchService } from '../../src/modules/search/search.service';

describe('Search (e2e)', () => {
  let app: INestApplication;
  const mockService = { search: jest.fn() };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SearchModule],
    })
      .overrideProvider(SearchService)
      .useValue(mockService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /search?q=headphones', async () => {
    mockService.search.mockResolvedValue({ query: 'headphones', results: [], suggestion: null });
    const res = await request(app.getHttpServer()).get('/search?q=headphones');
    expect(res.status).toBe(200);
    expect(res.body.query).toBe('headphones');
  });

  it('GET /search with filters', async () => {
    mockService.search.mockResolvedValue({ query: 'phone', results: [], suggestion: null });
    const res = await request(app.getHttpServer()).get('/search?q=phone&categoryId=3&minPrice=10&maxPrice=500');
    expect(res.status).toBe(200);
    expect(mockService.search).toHaveBeenCalledWith('phone', { categoryId: 3, minPrice: 10, maxPrice: 500 });
  });

  afterAll(async () => {
    await app.close();
  });
});
