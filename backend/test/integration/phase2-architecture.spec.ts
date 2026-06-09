import * as fs from 'fs';
import * as path from 'path';

describe('Phase 2 Stage 2: Architecture', () => {
  const rootDir = path.resolve(__dirname, '../../..');
  const modulesDir = path.join(rootDir, 'backend', 'src', 'modules');
  const appModulePath = path.join(rootDir, 'backend', 'src', 'app.module.ts');

  function readModule(name: string): string {
    const modPath = path.join(modulesDir, name, `${name}.module.ts`);
    return fs.readFileSync(modPath, 'utf-8');
  }

  describe('IT-016-01: Wishlist module structure', () => {
    it('should have WishlistModule registered in AppModule', () => {
      const content = fs.readFileSync(appModulePath, 'utf-8');
      expect(content).toContain('WishlistModule');
    });

    it('should have WishlistItem entity with userId and productId', () => {
      const entityPath = path.join(modulesDir, 'wishlist', 'entities', 'wishlist-item.entity.ts');
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('userId');
      expect(content).toContain('productId');
    });

    it('should have moveToCart method in WishlistService', () => {
      const servicePath = path.join(modulesDir, 'wishlist', 'wishlist.service.ts');
      const content = fs.readFileSync(servicePath, 'utf-8');
      expect(content).toContain('moveToCart');
    });
  });

  describe('IT-017-01: Reviews module structure', () => {
    it('should have ReviewsModule registered in AppModule', () => {
      const content = fs.readFileSync(appModulePath, 'utf-8');
      expect(content).toContain('ReviewsModule');
    });

    it('should have Review entity with productId and userId', () => {
      const entityPath = path.join(modulesDir, 'reviews', 'entities', 'review.entity.ts');
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('productId');
      expect(content).toContain('userId');
    });
  });

  describe('IT-018-01: Recently viewed structure', () => {
    it('should have recently-viewed logic in RecommendationsModule or separate module', () => {
      const recServicePath = path.join(modulesDir, 'recommendations', 'recommendations.service.ts');
      const content = fs.readFileSync(recServicePath, 'utf-8');
      expect(content).toContain('recently');
    });
  });

  describe('IT-021-01: Notifications + BullMQ structure', () => {
    it('should have QueueModule registered in AppModule', () => {
      const content = fs.readFileSync(appModulePath, 'utf-8');
      expect(content).toContain('QueueModule');
    });

    it('should have NotificationsModule registered in AppModule', () => {
      const content = fs.readFileSync(appModulePath, 'utf-8');
      expect(content).toContain('NotificationsModule');
    });

    it('should have notifications queue registered in QueueModule', () => {
      const queueModule = readModule('queue');
      expect(queueModule).toContain('notifications');
    });
  });

  describe('IT-022-01: Promotions module structure', () => {
    it('should have PromotionsModule registered in AppModule', () => {
      const content = fs.readFileSync(appModulePath, 'utf-8');
      expect(content).toContain('PromotionsModule');
    });

    it('should have Promotion entity with startDate and endDate', () => {
      const entityPath = path.join(modulesDir, 'promotions', 'entities', 'promotion.entity.ts');
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('startDate');
      expect(content).toContain('endDate');
    });
  });

  describe('IT-030-01: Search module PostgreSQL architecture', () => {
    it('should have SearchModule registered in AppModule', () => {
      const content = fs.readFileSync(appModulePath, 'utf-8');
      expect(content).toContain('SearchModule');
    });

    it('should have SequelizeModule with PostgreSQL config in SearchModule', () => {
      const searchModule = readModule('search');
      expect(searchModule).toContain('SequelizeModule');
    });
  });
});
