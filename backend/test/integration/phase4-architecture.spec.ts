import * as fs from 'fs';
import * as path from 'path';

describe('IT-P4-002: Phase 4 Architecture — modules registered', () => {
  const rootDir = path.resolve(__dirname, '../..');

  it('should have ReportingModule file', () => {
    const modulePath = path.join(rootDir, 'src', 'modules', 'reporting', 'reporting.module.ts');
    expect(fs.existsSync(modulePath)).toBe(true);
    const content = fs.readFileSync(modulePath, 'utf-8');
    expect(content).toContain('@Module');
  });

  it('should have AnalyticsModule file', () => {
    const modulePath = path.join(rootDir, 'src', 'modules', 'analytics', 'analytics.module.ts');
    expect(fs.existsSync(modulePath)).toBe(true);
    const content = fs.readFileSync(modulePath, 'utf-8');
    expect(content).toContain('@Module');
  });

  it('should have LoyaltyModule file', () => {
    const modulePath = path.join(rootDir, 'src', 'modules', 'loyalty', 'loyalty.module.ts');
    expect(fs.existsSync(modulePath)).toBe(true);
    const content = fs.readFileSync(modulePath, 'utf-8');
    expect(content).toContain('@Module');
  });

  it('should have ReferralModule file', () => {
    const modulePath = path.join(rootDir, 'src', 'modules', 'referral', 'referral.module.ts');
    expect(fs.existsSync(modulePath)).toBe(true);
    const content = fs.readFileSync(modulePath, 'utf-8');
    expect(content).toContain('@Module');
  });

  it('should have AIAssistantModule file', () => {
    const modulePath = path.join(rootDir, 'src', 'modules', 'ai-assistant', 'ai-assistant.module.ts');
    expect(fs.existsSync(modulePath)).toBe(true);
    const content = fs.readFileSync(modulePath, 'utf-8');
    expect(content).toContain('@Module');
  });

  it('should have MonitoringModule file', () => {
    const modulePath = path.join(rootDir, 'src', 'modules', 'monitoring', 'monitoring.module.ts');
    expect(fs.existsSync(modulePath)).toBe(true);
    const content = fs.readFileSync(modulePath, 'utf-8');
    expect(content).toContain('@Module');
  });

  it('should have RateLimiterModule file', () => {
    const modulePath = path.join(rootDir, 'src', 'modules', 'rate-limiter', 'rate-limiter.module.ts');
    expect(fs.existsSync(modulePath)).toBe(true);
    const content = fs.readFileSync(modulePath, 'utf-8');
    expect(content).toContain('@Module');
  });

  it('should have all 7 Phase 4 modules imported in AppModule', () => {
    const appModule = path.join(rootDir, 'src', 'app.module.ts');
    const content = fs.readFileSync(appModule, 'utf-8');
    const expectedModules = [
      'ReportingModule',
      'AnalyticsModule',
      'LoyaltyModule',
      'ReferralModule',
      'AIAssistantModule',
      'MonitoringModule',
      'RateLimiterModule',
    ];
    expectedModules.forEach((mod) => {
      expect(content).toContain(mod);
    });
  });

  it('should have all 7 Phase 4 module imports at top of AppModule', () => {
    const appModule = path.join(rootDir, 'src', 'app.module.ts');
    const content = fs.readFileSync(appModule, 'utf-8');
    const expectedImports = [
      "import { ReportingModule } from './modules/reporting/reporting.module';",
      "import { AnalyticsModule } from './modules/analytics/analytics.module';",
      "import { LoyaltyModule } from './modules/loyalty/loyalty.module';",
      "import { ReferralModule } from './modules/referral/referral.module';",
      "import { AIAssistantModule } from './modules/ai-assistant/ai-assistant.module';",
      "import { MonitoringModule } from './modules/monitoring/monitoring.module';",
      "import { RateLimiterModule } from './modules/rate-limiter/rate-limiter.module';",
    ];
    expectedImports.forEach((imp) => {
      expect(content).toContain(imp);
    });
  });
});
