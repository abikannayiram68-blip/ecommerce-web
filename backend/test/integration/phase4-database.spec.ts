import * as fs from 'fs';
import * as path from 'path';

describe('IT-P4-003: Phase 4 Database — entity models', () => {
  const rootDir = path.resolve(__dirname, '../..');

  describe('Reporting and aggregation entities', () => {
    it('should have SalesSummary entity with table sales_summaries', () => {
      const entityPath = path.join(rootDir, 'src', 'modules', 'reporting', 'entities', 'sales-summary.entity.ts');
      expect(fs.existsSync(entityPath)).toBe(true);
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('@Table');
      expect(content).toContain("tableName: 'sales_summaries'");
      expect(content).toContain('extends Model');
    });

    it('should have SalesSummary entity with expected columns', () => {
      const entityPath = path.join(rootDir, 'src', 'modules', 'reporting', 'entities', 'sales-summary.entity.ts');
      const content = fs.readFileSync(entityPath, 'utf-8');
      const columns = ['period', 'totalRevenue', 'totalOrders', 'totalProducts', 'avgOrderValue'];
      columns.forEach((col) => expect(content).toContain(col));
    });
  });

  describe('Loyalty points and referral tracking', () => {
    it('should have LoyaltyPoint entity with table loyalty_points', () => {
      const entityPath = path.join(rootDir, 'src', 'modules', 'loyalty', 'entities', 'loyalty-point.entity.ts');
      expect(fs.existsSync(entityPath)).toBe(true);
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('@Table');
      expect(content).toContain("tableName: 'loyalty_points'");
      expect(content).toContain('extends Model');
    });

    it('should have LoyaltyPoint entity with userId, points, reason columns', () => {
      const entityPath = path.join(rootDir, 'src', 'modules', 'loyalty', 'entities', 'loyalty-point.entity.ts');
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('userId');
      expect(content).toContain('points');
      expect(content).toContain('balance');
    });

    it('should have Referral entity with table referrals', () => {
      const entityPath = path.join(rootDir, 'src', 'modules', 'referral', 'entities', 'referral.entity.ts');
      expect(fs.existsSync(entityPath)).toBe(true);
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('@Table');
      expect(content).toContain("tableName: 'referrals'");
      expect(content).toContain('extends Model');
    });

    it('should have Referral entity with referrerId, refereeId, status columns', () => {
      const entityPath = path.join(rootDir, 'src', 'modules', 'referral', 'entities', 'referral.entity.ts');
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('referrerId');
      expect(content).toContain('refereeId');
      expect(content).toContain('status');
      expect(content).toContain('rewardPoints');
    });
  });

  describe('Performance indexes', () => {
    it('should have index decorators on SalesSummary period column', () => {
      const entityPath = path.join(rootDir, 'src', 'modules', 'reporting', 'entities', 'sales-summary.entity.ts');
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('unique');
    });

    it('should have index on LoyaltyPoint userId column', () => {
      const entityPath = path.join(rootDir, 'src', 'modules', 'loyalty', 'entities', 'loyalty-point.entity.ts');
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('unique: true');
    });

    it('should have index on Referral referrerId column', () => {
      const entityPath = path.join(rootDir, 'src', 'modules', 'referral', 'entities', 'referral.entity.ts');
      const content = fs.readFileSync(entityPath, 'utf-8');
      expect(content).toContain('ForeignKey');
      expect(content).toContain('BelongsTo');
    });
  });

  describe('Module Sequelize imports', () => {
    it('should have ReportingModule import SalesSummary entity', () => {
      const modulePath = path.join(rootDir, 'src', 'modules', 'reporting', 'reporting.module.ts');
      const content = fs.readFileSync(modulePath, 'utf-8');
      expect(content).toContain('SequelizeModule.forFeature');
      expect(content).toContain('SalesSummary');
    });

    it('should have LoyaltyModule import LoyaltyPoint entity', () => {
      const modulePath = path.join(rootDir, 'src', 'modules', 'loyalty', 'loyalty.module.ts');
      const content = fs.readFileSync(modulePath, 'utf-8');
      expect(content).toContain('SequelizeModule.forFeature');
      expect(content).toContain('LoyaltyPoint');
    });

    it('should have ReferralModule import Referral entity', () => {
      const modulePath = path.join(rootDir, 'src', 'modules', 'referral', 'referral.module.ts');
      const content = fs.readFileSync(modulePath, 'utf-8');
      expect(content).toContain('SequelizeModule.forFeature');
      expect(content).toContain('Referral');
    });
  });
});
