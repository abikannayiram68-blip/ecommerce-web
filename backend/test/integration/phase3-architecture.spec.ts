import * as fs from 'fs';
import * as path from 'path';

describe('IT-P3-002: Phase 3 Architecture — modules registered', () => {
  const rootDir = path.resolve(__dirname, '../..');

  it('should have VendorModule file', () => {
    const modulePath = path.join(rootDir, 'src', 'modules', 'vendor', 'vendor.module.ts');
    expect(fs.existsSync(modulePath)).toBe(true);
    const content = fs.readFileSync(modulePath, 'utf-8');
    expect(content).toContain('@Module');
  });

  it('should have CommissionModule file', () => {
    const modulePath = path.join(rootDir, 'src', 'modules', 'commission', 'commission.module.ts');
    expect(fs.existsSync(modulePath)).toBe(true);
    const content = fs.readFileSync(modulePath, 'utf-8');
    expect(content).toContain('@Module');
  });

  it('should have PayoutModule file', () => {
    const modulePath = path.join(rootDir, 'src', 'modules', 'payout', 'payout.module.ts');
    expect(fs.existsSync(modulePath)).toBe(true);
    const content = fs.readFileSync(modulePath, 'utf-8');
    expect(content).toContain('@Module');
  });

  it('should have MarketplaceModule file', () => {
    const modulePath = path.join(rootDir, 'src', 'modules', 'marketplace', 'marketplace.module.ts');
    expect(fs.existsSync(modulePath)).toBe(true);
    const content = fs.readFileSync(modulePath, 'utf-8');
    expect(content).toContain('@Module');
  });

  it('should have VendorStorefrontModule file', () => {
    const modulePath = path.join(rootDir, 'src', 'modules', 'vendor-storefront', 'vendor-storefront.module.ts');
    expect(fs.existsSync(modulePath)).toBe(true);
    const content = fs.readFileSync(modulePath, 'utf-8');
    expect(content).toContain('@Module');
  });

  it('should have MultiCurrencyModule file', () => {
    const modulePath = path.join(rootDir, 'src', 'modules', 'multi-currency', 'multi-currency.module.ts');
    expect(fs.existsSync(modulePath)).toBe(true);
    const content = fs.readFileSync(modulePath, 'utf-8');
    expect(content).toContain('@Module');
  });

  it('should have TaxModule file', () => {
    const modulePath = path.join(rootDir, 'src', 'modules', 'tax', 'tax.module.ts');
    expect(fs.existsSync(modulePath)).toBe(true);
    const content = fs.readFileSync(modulePath, 'utf-8');
    expect(content).toContain('@Module');
  });

  it('should have all 7 Phase 3 modules imported in AppModule', () => {
    const appModule = path.join(rootDir, 'src', 'app.module.ts');
    const content = fs.readFileSync(appModule, 'utf-8');
    const expectedModules = [
      'VendorModule',
      'CommissionModule',
      'PayoutModule',
      'MarketplaceModule',
      'VendorStorefrontModule',
      'MultiCurrencyModule',
      'TaxModule',
    ];
    expectedModules.forEach((mod) => {
      expect(content).toContain(mod);
    });
  });

  it('should have all 7 Phase 3 module imports at top of AppModule', () => {
    const appModule = path.join(rootDir, 'src', 'app.module.ts');
    const content = fs.readFileSync(appModule, 'utf-8');
    const expectedImports = [
      "import { VendorModule } from './modules/vendor/vendor.module';",
      "import { CommissionModule } from './modules/commission/commission.module';",
      "import { PayoutModule } from './modules/payout/payout.module';",
      "import { MarketplaceModule } from './modules/marketplace/marketplace.module';",
      "import { VendorStorefrontModule } from './modules/vendor-storefront/vendor-storefront.module';",
      "import { MultiCurrencyModule } from './modules/multi-currency/multi-currency.module';",
      "import { TaxModule } from './modules/tax/tax.module';",
    ];
    expectedImports.forEach((imp) => {
      expect(content).toContain(imp);
    });
  });
});
