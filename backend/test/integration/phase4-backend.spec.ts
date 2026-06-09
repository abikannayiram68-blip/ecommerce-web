import * as fs from 'fs';
import * as path from 'path';

describe('IT-P4-004: Phase 4 Backend — services, controllers, and endpoints', () => {
  const rootDir = path.resolve(__dirname, '../..');

  describe('ReportingService', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'reporting');

    it('should have reporting.service.ts with getSalesReport method', () => {
      const content = fs.readFileSync(path.join(dir, 'reporting.service.ts'), 'utf-8');
      expect(content).toContain('getSalesReport');
      expect(content).toContain('startDate');
      expect(content).toContain('endDate');
    });

    it('should have reporting.service.ts with getRevenueSummary method', () => {
      const content = fs.readFileSync(path.join(dir, 'reporting.service.ts'), 'utf-8');
      expect(content).toContain('getRevenueSummary');
      expect(content).toContain('period');
    });

    it('should have reporting.controller.ts with GET endpoints', () => {
      const content = fs.readFileSync(path.join(dir, 'reporting.controller.ts'), 'utf-8');
      expect(content).toContain('@Get');
      expect(content).toContain('@Query');
      expect(content).toContain('UseGuards');
      expect(content).toContain('RolesGuard');
    });

    it('should wire service and controller in reporting.module.ts', () => {
      const content = fs.readFileSync(path.join(dir, 'reporting.module.ts'), 'utf-8');
      expect(content).toContain('ReportingService');
      expect(content).toContain('ReportingController');
    });
  });

  describe('AnalyticsService', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'analytics');

    it('should have analytics.service.ts with getConversionRate method', () => {
      const content = fs.readFileSync(path.join(dir, 'analytics.service.ts'), 'utf-8');
      expect(content).toContain('getConversionRate');
    });

    it('should have analytics.service.ts with getCustomerSegments method', () => {
      const content = fs.readFileSync(path.join(dir, 'analytics.service.ts'), 'utf-8');
      expect(content).toContain('getCustomerSegments');
    });

    it('should have analytics.controller.ts with GET endpoints', () => {
      const content = fs.readFileSync(path.join(dir, 'analytics.controller.ts'), 'utf-8');
      expect(content).toContain('@Get');
      expect(content).toContain('UseGuards');
    });

    it('should wire service and controller in analytics.module.ts', () => {
      const content = fs.readFileSync(path.join(dir, 'analytics.module.ts'), 'utf-8');
      expect(content).toContain('AnalyticsService');
      expect(content).toContain('AnalyticsController');
    });
  });

  describe('LoyaltyService', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'loyalty');

    it('should have loyalty.service.ts with getPoints method', () => {
      const content = fs.readFileSync(path.join(dir, 'loyalty.service.ts'), 'utf-8');
      expect(content).toContain('getPoints');
      expect(content).toContain('userId');
    });

    it('should have loyalty.service.ts with addPoints method', () => {
      const content = fs.readFileSync(path.join(dir, 'loyalty.service.ts'), 'utf-8');
      expect(content).toContain('addPoints');
      expect(content).toContain('LoyaltyPoint');
    });

    it('should have loyalty.controller.ts with GET and POST endpoints', () => {
      const content = fs.readFileSync(path.join(dir, 'loyalty.controller.ts'), 'utf-8');
      expect(content).toContain('@Get');
      expect(content).toContain('@Post');
      expect(content).toContain('UseGuards');
    });

    it('should wire service and controller in loyalty.module.ts', () => {
      const content = fs.readFileSync(path.join(dir, 'loyalty.module.ts'), 'utf-8');
      expect(content).toContain('LoyaltyService');
      expect(content).toContain('LoyaltyController');
      expect(content).toContain('SequelizeModule.forFeature([LoyaltyPoint])');
    });
  });

  describe('ReferralService', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'referral');

    it('should have referral.service.ts with createReferral method', () => {
      const content = fs.readFileSync(path.join(dir, 'referral.service.ts'), 'utf-8');
      expect(content).toContain('async create');
      expect(content).toContain('referrerId');
      expect(content).toContain('Referral');
    });

    it('should have referral.service.ts with getReferrals method', () => {
      const content = fs.readFileSync(path.join(dir, 'referral.service.ts'), 'utf-8');
      expect(content).toContain('getReferrals');
      expect(content).toContain('findAll');
    });

    it('should have referral.controller.ts with POST and GET endpoints', () => {
      const content = fs.readFileSync(path.join(dir, 'referral.controller.ts'), 'utf-8');
      expect(content).toContain('@Post');
      expect(content).toContain('@Get');
      expect(content).toContain('UseGuards');
    });

    it('should wire service and controller in referral.module.ts', () => {
      const content = fs.readFileSync(path.join(dir, 'referral.module.ts'), 'utf-8');
      expect(content).toContain('ReferralService');
      expect(content).toContain('ReferralController');
      expect(content).toContain('SequelizeModule.forFeature([Referral])');
    });
  });

  describe('AIAssistantService', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'ai-assistant');

    it('should have ai-assistant.service.ts with getResponse method', () => {
      const content = fs.readFileSync(path.join(dir, 'ai-assistant.service.ts'), 'utf-8');
      expect(content).toContain('getResponse');
      expect(content).toContain('query');
    });

    it('should have ai-assistant.controller.ts with POST endpoint', () => {
      const content = fs.readFileSync(path.join(dir, 'ai-assistant.controller.ts'), 'utf-8');
      expect(content).toContain('@Post');
      expect(content).toContain('@Body');
    });

    it('should wire service and controller in ai-assistant.module.ts', () => {
      const content = fs.readFileSync(path.join(dir, 'ai-assistant.module.ts'), 'utf-8');
      expect(content).toContain('AIAssistantService');
      expect(content).toContain('AIAssistantController');
    });
  });

  describe('MonitoringService', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'monitoring');

    it('should have monitoring.service.ts with getSystemHealth method', () => {
      const content = fs.readFileSync(path.join(dir, 'monitoring.service.ts'), 'utf-8');
      expect(content).toContain('getSystemHealth');
      expect(content).toContain('status');
    });

    it('should have monitoring.controller.ts with GET endpoint', () => {
      const content = fs.readFileSync(path.join(dir, 'monitoring.controller.ts'), 'utf-8');
      expect(content).toContain('@Get');
    });

    it('should wire service and controller in monitoring.module.ts', () => {
      const content = fs.readFileSync(path.join(dir, 'monitoring.module.ts'), 'utf-8');
      expect(content).toContain('MonitoringService');
      expect(content).toContain('MonitoringController');
    });
  });

  describe('RateLimiterService', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'rate-limiter');

    it('should have rate-limiter.service.ts with checkRate method', () => {
      const content = fs.readFileSync(path.join(dir, 'rate-limiter.service.ts'), 'utf-8');
      expect(content).toContain('checkRate');
      expect(content).toContain('key');
    });

    it('should have rate-limiter.module.ts wired correctly', () => {
      const content = fs.readFileSync(path.join(dir, 'rate-limiter.module.ts'), 'utf-8');
      expect(content).toContain('RateLimiterService');
    });
  });

  describe('Inventory forecasting', () => {
    it('should have inventory forecasting method in a service', () => {
      const productsService = path.join(rootDir, 'src', 'modules', 'products', 'products.service.ts');
      const content = fs.readFileSync(productsService, 'utf-8');
      expect(content).toContain('getForecast');
    });
  });

  describe('Voice and Visual search preparation', () => {
    it('should have SearchService with voiceSearch method', () => {
      const searchService = path.join(rootDir, 'src', 'modules', 'search', 'search.service.ts');
      const content = fs.readFileSync(searchService, 'utf-8');
      expect(content).toContain('voiceSearch');
    });

    it('should have SearchService with visualSearch method', () => {
      const searchService = path.join(rootDir, 'src', 'modules', 'search', 'search.service.ts');
      const content = fs.readFileSync(searchService, 'utf-8');
      expect(content).toContain('visualSearch');
    });
  });
});
