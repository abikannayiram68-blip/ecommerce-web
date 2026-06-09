import * as fs from 'fs';
import * as path from 'path';

describe('IT-P3-001: Phase 3 Setup — seller env configs', () => {
  const rootDir = path.resolve(__dirname, '../..');
  const envExample = path.join(rootDir, '..', '.env.example');
  const composePath = path.join(rootDir, '..', 'docker-compose.yml');
  const configModule = path.join(rootDir, 'src', 'database', 'config.module.ts');

  it('should have SELLER_COMMISSION_RATE in .env.example', () => {
    const content = fs.readFileSync(envExample, 'utf-8');
    expect(content).toContain('SELLER_COMMISSION_RATE');
    expect(content).toMatch(/# Seller/);
  });

  it('should have SELLER_MIN_PAYOUT in .env.example', () => {
    const content = fs.readFileSync(envExample, 'utf-8');
    expect(content).toContain('SELLER_MIN_PAYOUT');
  });

  it('should have SELLER_COMMISSION_RATE in docker-compose api service', () => {
    const content = fs.readFileSync(composePath, 'utf-8');
    const apiSection = content.slice(content.indexOf('api:'), content.indexOf('nginx:'));
    expect(apiSection).toContain('SELLER_COMMISSION_RATE');
  });

  it('should have SELLER_MIN_PAYOUT in docker-compose api service', () => {
    const content = fs.readFileSync(composePath, 'utf-8');
    const apiSection = content.slice(content.indexOf('api:'), content.indexOf('nginx:'));
    expect(apiSection).toContain('SELLER_MIN_PAYOUT');
  });

  it('should have ConfigModule set seller defaults', () => {
    const content = fs.readFileSync(configModule, 'utf-8');
    expect(content).toContain('SELLER_COMMISSION_RATE');
    expect(content).toContain('SELLER_MIN_PAYOUT');
  });

  it('should have Seller section in .env.example with all seller vars', () => {
    const content = fs.readFileSync(envExample, 'utf-8');
    const sellerSection = content.slice(content.indexOf('# Seller'));
    expect(sellerSection).toContain('SELLER_COMMISSION_RATE');
    expect(sellerSection).toContain('SELLER_MIN_PAYOUT');
    expect(sellerSection).toContain('SELLER_ONBOARDING_FEE');
    expect(sellerSection).toContain('SELLER_MAX_PENDING_PAYOUT');
  });
});
