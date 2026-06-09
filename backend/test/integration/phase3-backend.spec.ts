import * as fs from 'fs';
import * as path from 'path';

describe('IT-P3-005: Phase 3 Backend — services, controllers, and modules', () => {
  const rootDir = path.resolve(__dirname, '../..');

  describe('Vendor module', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'vendor');

    it('should have vendor.service.ts', () => {
      expect(fs.existsSync(path.join(dir, 'vendor.service.ts'))).toBe(true);
    });

    it('should have vendor.controller.ts', () => {
      expect(fs.existsSync(path.join(dir, 'vendor.controller.ts'))).toBe(true);
    });

    it('should wire service and controller in vendor.module.ts', () => {
      const content = fs.readFileSync(path.join(dir, 'vendor.module.ts'), 'utf-8');
      expect(content).toContain('VendorService');
      expect(content).toContain('VendorController');
      expect(content).toContain('SequelizeModule.forFeature([Vendor, VendorProduct])');
    });
  });

  describe('Commission module', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'commission');

    it('should have commission.service.ts', () => {
      expect(fs.existsSync(path.join(dir, 'commission.service.ts'))).toBe(true);
    });

    it('should have commission.controller.ts', () => {
      expect(fs.existsSync(path.join(dir, 'commission.controller.ts'))).toBe(true);
    });

    it('should wire service and controller in commission.module.ts', () => {
      const content = fs.readFileSync(path.join(dir, 'commission.module.ts'), 'utf-8');
      expect(content).toContain('CommissionService');
      expect(content).toContain('CommissionController');
      expect(content).toContain('SequelizeModule.forFeature([CommissionPlan])');
    });
  });

  describe('Payout module', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'payout');

    it('should have payout.service.ts', () => {
      expect(fs.existsSync(path.join(dir, 'payout.service.ts'))).toBe(true);
    });

    it('should have payout.controller.ts', () => {
      expect(fs.existsSync(path.join(dir, 'payout.controller.ts'))).toBe(true);
    });

    it('should wire service and controller in payout.module.ts', () => {
      const content = fs.readFileSync(path.join(dir, 'payout.module.ts'), 'utf-8');
      expect(content).toContain('PayoutService');
      expect(content).toContain('PayoutController');
      expect(content).toContain('SequelizeModule.forFeature([Payout, Vendor])');
    });
  });

  describe('Marketplace module', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'marketplace');

    it('should have marketplace.service.ts', () => {
      expect(fs.existsSync(path.join(dir, 'marketplace.service.ts'))).toBe(true);
    });

    it('should have marketplace.controller.ts', () => {
      expect(fs.existsSync(path.join(dir, 'marketplace.controller.ts'))).toBe(true);
    });

    it('should wire service and controller in marketplace.module.ts', () => {
      const content = fs.readFileSync(path.join(dir, 'marketplace.module.ts'), 'utf-8');
      expect(content).toContain('MarketplaceService');
      expect(content).toContain('MarketplaceController');
      expect(content).toContain('SequelizeModule.forFeature([Dispute, VendorMessage])');
    });
  });

  describe('VendorStorefront module', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'vendor-storefront');

    it('should have vendor-storefront.service.ts', () => {
      expect(fs.existsSync(path.join(dir, 'vendor-storefront.service.ts'))).toBe(true);
    });

    it('should have vendor-storefront.controller.ts', () => {
      expect(fs.existsSync(path.join(dir, 'vendor-storefront.controller.ts'))).toBe(true);
    });

    it('should wire service and controller in vendor-storefront.module.ts', () => {
      const content = fs.readFileSync(path.join(dir, 'vendor-storefront.module.ts'), 'utf-8');
      expect(content).toContain('VendorStorefrontService');
      expect(content).toContain('VendorStorefrontController');
    });
  });

  describe('MultiCurrency module', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'multi-currency');

    it('should have multi-currency.service.ts', () => {
      expect(fs.existsSync(path.join(dir, 'multi-currency.service.ts'))).toBe(true);
    });

    it('should have multi-currency.controller.ts', () => {
      expect(fs.existsSync(path.join(dir, 'multi-currency.controller.ts'))).toBe(true);
    });

    it('should wire service and controller in multi-currency.module.ts', () => {
      const content = fs.readFileSync(path.join(dir, 'multi-currency.module.ts'), 'utf-8');
      expect(content).toContain('MultiCurrencyService');
      expect(content).toContain('MultiCurrencyController');
      expect(content).toContain('SequelizeModule.forFeature([Currency])');
    });
  });

  describe('Tax module', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'tax');

    it('should have tax.service.ts', () => {
      expect(fs.existsSync(path.join(dir, 'tax.service.ts'))).toBe(true);
    });

    it('should have tax.controller.ts', () => {
      expect(fs.existsSync(path.join(dir, 'tax.controller.ts'))).toBe(true);
    });

    it('should wire service and controller in tax.module.ts', () => {
      const content = fs.readFileSync(path.join(dir, 'tax.module.ts'), 'utf-8');
      expect(content).toContain('TaxService');
      expect(content).toContain('TaxController');
      expect(content).toContain('SequelizeModule.forFeature([TaxRate])');
    });
  });
});
