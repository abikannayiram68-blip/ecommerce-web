import * as fs from 'fs';
import * as path from 'path';

describe('IT-P3-004: Phase 3 Database — entity models', () => {
  const rootDir = path.resolve(__dirname, '../..');

  const entities = [
    { name: 'Vendor', dir: 'vendor', table: 'vendors' },
    { name: 'CommissionPlan', dir: 'commission', table: 'commission_plans' },
    { name: 'Payout', dir: 'payout', table: 'payouts' },
    { name: 'VendorProduct', dir: 'vendor', table: 'vendor_products' },
    { name: 'Dispute', dir: 'marketplace', table: 'disputes' },
    { name: 'VendorMessage', dir: 'marketplace', table: 'vendor_messages' },
    { name: 'Currency', dir: 'multi-currency', table: 'currencies' },
    { name: 'TaxRate', dir: 'tax', table: 'tax_rates' },
  ];

  entities.forEach(({ name, dir, table }) => {
    it(`should have ${name} entity with table ${table}`, () => {
      const entityPath = path.join(rootDir, 'src', 'modules', dir, 'entities', `${name.toLowerCase().replace(/_/g, '-')}.entity.ts`);
      const altPath = path.join(rootDir, 'src', 'modules', dir, 'entities', `${name.charAt(0).toLowerCase() + name.slice(1).replace(/[A-Z]/g, (c) => '-' + c.toLowerCase()).replace(/^-/, '')}.entity.ts`);
      const finalPath = fs.existsSync(entityPath) ? entityPath : (fs.existsSync(altPath) ? altPath : null);
      expect(finalPath).not.toBeNull();
      const content = fs.readFileSync(finalPath!, 'utf-8');
      expect(content).toContain('@Table');
      expect(content).toContain(`tableName: '${table}'`);
      expect(content).toContain('extends Model');
    });
  });

  it('should have Vendor entity with all expected columns', () => {
    const entityPath = path.join(rootDir, 'src', 'modules', 'vendor', 'entities', 'vendor.entity.ts');
    const content = fs.readFileSync(entityPath, 'utf-8');
    const columns = ['storeName', 'slug', 'status', 'email', 'commissionRate', 'totalSales', 'rating', 'userId'];
    columns.forEach((col) => expect(content).toContain(col));
  });

  it('should have CommissionPlan entity with rate and minPayout', () => {
    const entityPath = path.join(rootDir, 'src', 'modules', 'commission', 'entities', 'commission-plan.entity.ts');
    const content = fs.readFileSync(entityPath, 'utf-8');
    expect(content).toContain('rate');
    expect(content).toContain('minPayout');
    expect(content).toContain('isDefault');
  });

  it('should have Payout entity with vendorId FK and status', () => {
    const entityPath = path.join(rootDir, 'src', 'modules', 'payout', 'entities', 'payout.entity.ts');
    const content = fs.readFileSync(entityPath, 'utf-8');
    expect(content).toContain('vendorId');
    expect(content).toContain('ForeignKey');
    expect(content).toContain('@BelongsTo');
    expect(content).toContain('Vendor');
    expect(content).toContain('amount');
    expect(content).toContain('status');
  });

  it('should have VendorProduct entity with vendorId and productId FKs', () => {
    const entityPath = path.join(rootDir, 'src', 'modules', 'vendor', 'entities', 'vendor-product.entity.ts');
    const content = fs.readFileSync(entityPath, 'utf-8');
    expect(content).toContain('vendorId');
    expect(content).toContain('productId');
    expect(content).toContain('price');
    expect(content).toContain('stock');
  });

  it('should have Currency entity with code and exchangeRate', () => {
    const entityPath = path.join(rootDir, 'src', 'modules', 'multi-currency', 'entities', 'currency.entity.ts');
    const content = fs.readFileSync(entityPath, 'utf-8');
    expect(content).toContain('code');
    expect(content).toContain('exchangeRate');
    expect(content).toContain('isBase');
  });

  it('should have TaxRate entity with countryCode and rate', () => {
    const entityPath = path.join(rootDir, 'src', 'modules', 'tax', 'entities', 'tax-rate.entity.ts');
    const content = fs.readFileSync(entityPath, 'utf-8');
    expect(content).toContain('countryCode');
    expect(content).toContain('rate');
    expect(content).toContain('isActive');
  });

  it('should have Dispute entity with vendorId and orderId', () => {
    const entityPath = path.join(rootDir, 'src', 'modules', 'marketplace', 'entities', 'dispute.entity.ts');
    const content = fs.readFileSync(entityPath, 'utf-8');
    expect(content).toContain('vendorId');
    expect(content).toContain('orderId');
    expect(content).toContain('reason');
    expect(content).toContain('status');
  });

  it('should have VendorMessage entity with vendorId and userId', () => {
    const entityPath = path.join(rootDir, 'src', 'modules', 'marketplace', 'entities', 'vendor-message.entity.ts');
    const content = fs.readFileSync(entityPath, 'utf-8');
    expect(content).toContain('vendorId');
    expect(content).toContain('userId');
    expect(content).toContain('message');
    expect(content).toContain('direction');
  });

  it('should have Vendor entity with HasMany associations', () => {
    const entityPath = path.join(rootDir, 'src', 'modules', 'vendor', 'entities', 'vendor.entity.ts');
    const content = fs.readFileSync(entityPath, 'utf-8');
    expect(content).toContain('HasMany');
    expect(content).toContain('Payout');
    expect(content).toContain('VendorProduct');
  });
});
