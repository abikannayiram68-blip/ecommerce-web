import * as fs from 'fs';
import * as path from 'path';

describe('IT-P3-007: Phase 3 Deployment — Docker, migrations, CI/CD, multi-currency payments', () => {
  const rootDir = path.resolve(__dirname, '../../..');
  const composePath = path.join(rootDir, 'docker-compose.yml');
  const deployPath = path.join(rootDir, '.github', 'workflows', 'deploy.yml');
  const ciPath = path.join(rootDir, '.github', 'workflows', 'ci.yml');
  const envExample = path.join(rootDir, '.env.example');

  describe('Step 1: Docker services for new dependencies', () => {
    it('should have SELLER env vars in docker-compose api service', () => {
      const content = fs.readFileSync(composePath, 'utf-8');
      const apiSection = content.slice(content.indexOf('api:'), content.indexOf('nginx:'));
      expect(apiSection).toContain('SELLER_COMMISSION_RATE');
      expect(apiSection).toContain('SELLER_MIN_PAYOUT');
      expect(apiSection).toContain('SELLER_ONBOARDING_FEE');
      expect(apiSection).toContain('SELLER_MAX_PENDING_PAYOUT');
    });

    it('should have multi-currency env vars in docker-compose api service', () => {
      const content = fs.readFileSync(composePath, 'utf-8');
      const apiSection = content.slice(content.indexOf('api:'), content.indexOf('nginx:'));
      expect(apiSection).toContain('SELLER_COMMISSION_RATE');
    });

    it('should have all Phase 3 env vars in .env.example', () => {
      const content = fs.readFileSync(envExample, 'utf-8');
      expect(content).toContain('SELLER_COMMISSION_RATE');
      expect(content).toContain('SELLER_MIN_PAYOUT');
      expect(content).toContain('SELLER_ONBOARDING_FEE');
      expect(content).toContain('SELLER_MAX_PENDING_PAYOUT');
    });
  });

  describe('Step 2: Database migrations', () => {
    const dbDir = path.join(rootDir, 'backend', 'src', 'database');

    it('should have seeders directory', () => {
      const seedDir = path.join(dbDir, 'seeders');
      expect(fs.existsSync(seedDir)).toBe(true);
    });

    it('should have seed script in package.json', () => {
      const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'backend', 'package.json'), 'utf-8'));
      expect(pkg.scripts).toHaveProperty('seed');
      expect(pkg.scripts.seed).toContain('seed');
    });

    it('should have Currency entity with code, exchangeRate, isBase, isActive', () => {
      const entityPath = path.join(rootDir, 'backend', 'src', 'modules', 'multi-currency', 'entities', 'currency.entity.ts');
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('code');
      expect(content).toContain('exchangeRate');
      expect(content).toContain('isBase');
      expect(content).toContain('isActive');
    });

    it('should have TaxRate entity with countryCode, rate, region', () => {
      const entityPath = path.join(rootDir, 'backend', 'src', 'modules', 'tax', 'entities', 'tax-rate.entity.ts');
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('countryCode');
      expect(content).toContain('rate');
      expect(content).toContain('region');
    });

    it('should have Vendor entity with storeName, slug, status fields', () => {
      const entityPath = path.join(rootDir, 'backend', 'src', 'modules', 'vendor', 'entities', 'vendor.entity.ts');
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('storeName');
      expect(content).toContain('slug');
      expect(content).toContain('status');
    });
  });

  describe('Step 3: CI/CD pipeline', () => {
    it('should have deploy workflow with Phase 3 test step', () => {
      const content = fs.readFileSync(deployPath, 'utf-8');
      expect(content).toContain('npm test');
      expect(content).toContain('docker build');
      expect(content).toContain('docker-compose up');
    });

    it('should have CI workflow building backend and frontend', () => {
      const content = fs.readFileSync(ciPath, 'utf-8');
      expect(content).toContain('npm run build');
      expect(content).toContain('backend');
      expect(content).toContain('frontend');
    });

    it('should have CI workflow running tests', () => {
      const content = fs.readFileSync(ciPath, 'utf-8');
      expect(content).toContain('npm test');
    });
  });

  describe('Step 4: Multi-currency payment providers', () => {
    it('should have MultiCurrencyService with convert method', () => {
      const servicePath = path.join(rootDir, 'backend', 'src', 'modules', 'multi-currency', 'multi-currency.service.ts');
      const content = fs.readFileSync(servicePath, 'utf-8');
      expect(content).toContain('async convert');
      expect(content).toContain('fromCode');
      expect(content).toContain('toCode');
    });

    it('should have MultiCurrencyController with GET /currencies endpoint', () => {
      const ctrlPath = path.join(rootDir, 'backend', 'src', 'modules', 'multi-currency', 'multi-currency.controller.ts');
      const content = fs.readFileSync(ctrlPath, 'utf-8');
      expect(content).toContain('@Get()');
      expect(content).toContain('findAll');
    });

    it('should have MultiCurrencyController with GET /currencies/convert endpoint', () => {
      const ctrlPath = path.join(rootDir, 'backend', 'src', 'modules', 'multi-currency', 'multi-currency.controller.ts');
      const content = fs.readFileSync(ctrlPath, 'utf-8');
      expect(content).toContain('@Get');
      expect(content).toContain('convert');
    });

    it('should have TaxService with calculate method', () => {
      const servicePath = path.join(rootDir, 'backend', 'src', 'modules', 'tax', 'tax.service.ts');
      const content = fs.readFileSync(servicePath, 'utf-8');
      expect(content).toContain('async calculate');
      expect(content).toContain('countryCode');
      expect(content).toContain('taxAmount');
    });

    it('should have all Phase 3 modules registered in AppModule', () => {
      const appModule = path.join(rootDir, 'backend', 'src', 'app.module.ts');
      const content = fs.readFileSync(appModule, 'utf-8');
      expect(content).toContain('VendorModule');
      expect(content).toContain('CommissionModule');
      expect(content).toContain('PayoutModule');
      expect(content).toContain('MarketplaceModule');
      expect(content).toContain('VendorStorefrontModule');
      expect(content).toContain('MultiCurrencyModule');
      expect(content).toContain('TaxModule');
    });

    it('should have backend Dockerfile with healthcheck', () => {
      const dockerfile = path.join(rootDir, 'backend', 'Dockerfile');
      const content = fs.readFileSync(dockerfile, 'utf-8');
      expect(content).toContain('HEALTHCHECK');
      expect(content).toContain('wget');
      expect(content).toContain('api/health');
    });

    it('should have nginx configuration proxying to api', () => {
      const nginxConf = path.join(rootDir, 'nginx', 'nginx.conf');
      const content = fs.readFileSync(nginxConf, 'utf-8');
      expect(content).toContain('proxy_pass http://api:3000');
    });
  });
});
