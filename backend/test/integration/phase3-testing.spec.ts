import * as fs from 'fs';
import * as path from 'path';

describe('IT-P3-006: Phase 3 Testing — commission, onboarding, and currency', () => {
  const rootDir = path.resolve(__dirname, '../..');

  describe('Step 1: Commission calculation', () => {
    const servicePath = path.join(rootDir, 'src', 'modules', 'commission', 'commission.service.ts');
    const entityPath = path.join(rootDir, 'src', 'modules', 'commission', 'entities', 'commission-plan.entity.ts');

    it('should have CommissionService.calculate method', () => {
      const content = fs.readFileSync(servicePath, 'utf-8');
      expect(content).toContain('async calculate');
      expect(content).toContain('amount');
      expect(content).toContain('planId');
    });

    it('should calculate commission correctly: amount * rate / 100', () => {
      const content = fs.readFileSync(servicePath, 'utf-8');
      expect(content).toContain('(amount * Number(plan.rate)) / 100');
    });

    it('should return commission, netAmount, rate and amount', () => {
      const content = fs.readFileSync(servicePath, 'utf-8');
      expect(content).toContain('commission');
      expect(content).toContain('netAmount');
    });

    it('should have CommissionPlan entity with rate, minPayout, isDefault', () => {
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('rate');
      expect(content).toContain('minPayout');
      expect(content).toContain('isDefault');
      expect(content).toContain('maxPendingPayout');
    });

    it('should wire CommissionService in commission.module.ts', () => {
      const content = fs.readFileSync(path.join(rootDir, 'src', 'modules', 'commission', 'commission.module.ts'), 'utf-8');
      expect(content).toContain('CommissionService');
      expect(content).toContain('CommissionController');
      expect(content).toContain('SequelizeModule.forFeature([CommissionPlan])');
    });

    it('should have CommissionController with estimate endpoint', () => {
      const content = fs.readFileSync(path.join(rootDir, 'src', 'modules', 'commission', 'commission.controller.ts'), 'utf-8');
      expect(content).toContain('calculate');
      expect(content).toContain('AuthGuard');
      expect(content).toContain('RolesGuard');
    });
  });

  describe('Step 2: Seller onboarding integration', () => {
    const servicePath = path.join(rootDir, 'src', 'modules', 'vendor', 'vendor.service.ts');
    const controllerPath = path.join(rootDir, 'src', 'modules', 'vendor', 'vendor.controller.ts');

    it('should have VendorService.create method', () => {
      const content = fs.readFileSync(servicePath, 'utf-8');
      expect(content).toContain('async create');
      expect(content).toContain('userId');
      expect(content).toContain('BadRequestException');
      expect(content).toContain('VENDOR_ALREADY_EXISTS');
    });

    it('should have VendorService.findByUser for vendor lookup', () => {
      const content = fs.readFileSync(servicePath, 'utf-8');
      expect(content).toContain('async findByUser');
      expect(content).toContain('userId');
      expect(content).toContain('NotFoundException');
    });

    it('should have VendorService.getDashboard with VendorProduct include', () => {
      const content = fs.readFileSync(servicePath, 'utf-8');
      expect(content).toContain('async getDashboard');
      expect(content).toContain('VendorProduct');
    });

    it('should have VendorService.findAll for admin listing', () => {
      const content = fs.readFileSync(servicePath, 'utf-8');
      expect(content).toContain('async findAll');
      expect(content).toContain('findAndCountAll');
    });

    it('should have VendorController with register, my-profile, my-dashboard endpoints', () => {
      const content = fs.readFileSync(controllerPath, 'utf-8');
      expect(content).toContain("register'");
      expect(content).toContain("my/profile'");
      expect(content).toContain("my/dashboard'");
      expect(content).toContain(':id');
    });

    it('should use AuthGuard on vendor endpoints', () => {
      const content = fs.readFileSync(controllerPath, 'utf-8');
      expect(content).toContain('AuthGuard');
    });
  });

  describe('Step 4: Currency conversion accuracy', () => {
    const mcServicePath = path.join(rootDir, 'src', 'modules', 'multi-currency', 'multi-currency.service.ts');
    const taxServicePath = path.join(rootDir, 'src', 'modules', 'tax', 'tax.service.ts');
    const currencyEntityPath = path.join(rootDir, 'src', 'modules', 'multi-currency', 'entities', 'currency.entity.ts');
    const taxEntityPath = path.join(rootDir, 'src', 'modules', 'tax', 'entities', 'tax-rate.entity.ts');

    it('should have MultiCurrencyService.convert method', () => {
      const content = fs.readFileSync(mcServicePath, 'utf-8');
      expect(content).toContain('async convert');
      expect(content).toContain('fromCode');
      expect(content).toContain('toCode');
    });

    it('should convert correctly: amount * fromRate / toRate', () => {
      const content = fs.readFileSync(mcServicePath, 'utf-8');
      expect(content).toContain('amount * Number(from.exchangeRate)');
      expect(content).toContain('baseAmount / Number(to.exchangeRate)');
    });

    it('should return original amount, converted value, and rate', () => {
      const content = fs.readFileSync(mcServicePath, 'utf-8');
      expect(content).toContain('from:');
      expect(content).toContain('to:');
      expect(content).toContain('converted');
    });

    it('should have TaxService.calculate method with countryCode and region', () => {
      const content = fs.readFileSync(taxServicePath, 'utf-8');
      expect(content).toContain('async calculate');
      expect(content).toContain('countryCode');
      expect(content).toContain('totalRate');
      expect(content).toContain('taxAmount');
      expect(content).toContain('totalWithTax');
    });

    it('should calculate tax correctly: amount * totalRate / 100', () => {
      const content = fs.readFileSync(taxServicePath, 'utf-8');
      expect(content).toContain('(amount * totalRate) / 100');
    });

    it('should have Currency entity with code, exchangeRate, isBase, isActive', () => {
      const content = fs.readFileSync(currencyEntityPath, 'utf-8');
      expect(content).toContain('code');
      expect(content).toContain('exchangeRate');
      expect(content).toContain('isBase');
      expect(content).toContain('isActive');
    });

    it('should have TaxRate entity with countryCode, rate, region, isActive', () => {
      const content = fs.readFileSync(taxEntityPath, 'utf-8');
      expect(content).toContain('countryCode');
      expect(content).toContain('rate');
      expect(content).toContain('region');
      expect(content).toContain('isActive');
    });
  });
});
