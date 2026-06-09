import * as fs from 'fs';
import * as path from 'path';

describe('Phase 2 Stage 3: Database', () => {
  const modulesDir = path.resolve(__dirname, '../../src/modules');

  function readEntity(mod: string, file: string): string {
    return fs.readFileSync(path.join(modulesDir, mod, 'entities', file), 'utf-8');
  }

  describe('UT-016-01: WishlistItem entity', () => {
    it('should have userId and productId fields', () => {
      const content = readEntity('wishlist', 'wishlist-item.entity.ts');
      expect(content).toContain('userId');
      expect(content).toContain('productId');
      expect(content).toContain('ForeignKey');
      expect(content).toContain('BelongsTo');
    });
  });

  describe('UT-017-01: Review entity', () => {
    it('should have rating, comment, status fields', () => {
      const content = readEntity('reviews', 'review.entity.ts');
      expect(content).toContain('rating');
      expect(content).toContain('comment');
      expect(content).toContain('status');
      expect(content).toContain('pending');
      expect(content).toContain('approved');
    });
  });

  describe('UT-018-01: RecentlyViewed entity', () => {
    it('should have userId and productId fields with timestamps', () => {
      const content = readEntity('recommendations', 'recently-viewed.entity.ts');
      expect(content).toContain('userId');
      expect(content).toContain('productId');
      expect(content).toContain('timestamps: true');
    });
  });

  describe('UT-021-01: Notification entity', () => {
    it('should have type, title, message, isRead fields', () => {
      const content = readEntity('notifications', 'notification.entity.ts');
      expect(content).toContain('type');
      expect(content).toContain('title');
      expect(content).toContain('message');
      expect(content).toContain('isRead');
      expect(content).toContain('order_update');
      expect(content).toContain('promotion');
    });
  });

  describe('UT-022-01: Promotion entity', () => {
    it('should have startDate, endDate, isActive fields', () => {
      const content = readEntity('promotions', 'promotion.entity.ts');
      expect(content).toContain('startDate');
      expect(content).toContain('endDate');
      expect(content).toContain('isActive');
      expect(content).toContain('percentage');
      expect(content).toContain('fixed');
    });
  });

  describe('UT-030-01: MySQL FULLTEXT search setup', () => {
    it('should have FULLTEXT index on Product entity for name and description', () => {
      const content = readEntity('products', 'product.entity.ts');
      expect(content).toContain('FULLTEXT');
      expect(content).toContain('idx_products_search');
      expect(content).toContain('name');
      expect(content).toContain('description');
    });

    it('should have SearchModule with Product model imported', () => {
      const searchModule = path.resolve(__dirname, '../../src/modules/search/search.module.ts');
      const content = fs.readFileSync(searchModule, 'utf-8');
      expect(content).toContain('SequelizeModule.forFeature');
      expect(content).toContain('Product');
    });
  });
});
