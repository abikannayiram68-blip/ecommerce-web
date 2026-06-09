import * as fs from 'fs';
import * as path from 'path';

describe('Phase 2 Stage 1: Setup', () => {
  const rootDir = path.resolve(__dirname, '../../..');
  const modulesDir = path.join(rootDir, 'backend', 'src', 'modules');

  describe('IT-007-01: MySQL FULLTEXT search infrastructure', () => {
    it('should have SearchModule registered in app module', () => {
      const appModule = path.join(rootDir, 'backend', 'src', 'app.module.ts');
      const content = fs.readFileSync(appModule, 'utf-8');
      expect(content).toContain('SearchModule');
    });

    it('should have Product model with FULLTEXT index on name and description', () => {
      const productEntity = path.join(modulesDir, 'products', 'entities', 'product.entity.ts');
      const content = fs.readFileSync(productEntity, 'utf-8');
      expect(content).toContain('FULLTEXT');
      expect(content).toContain('name');
      expect(content).toContain('description');
    });
  });

  describe('IT-021-01: BullMQ notification infrastructure', () => {
    it('should have bullmq package installed', () => {
      const packageJson = path.join(rootDir, 'backend', 'package.json');
      const content = fs.readFileSync(packageJson, 'utf-8');
      expect(content).toContain('bullmq');
    });

    it('should have QueueModule in app module', () => {
      const appModule = path.join(rootDir, 'backend', 'src', 'app.module.ts');
      const content = fs.readFileSync(appModule, 'utf-8');
      expect(content).toContain('QueueModule');
    });

    it('should have @nestjs/bullmq installed', () => {
      const packageJson = path.join(rootDir, 'backend', 'package.json');
      const content = fs.readFileSync(packageJson, 'utf-8');
      expect(content).toContain('@nestjs/bullmq');
    });
  });
});
