import * as fs from 'fs';
import * as path from 'path';

describe('IT-P4-007: Phase 4 Auth — guards on Phase 4 controllers', () => {
  const rootDir = path.resolve(__dirname, '../..');

  describe('AIAssistantController auth', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'ai-assistant');

    it('should have ai-assistant.controller.ts with UseGuards decorator', () => {
      const content = fs.readFileSync(path.join(dir, 'ai-assistant.controller.ts'), 'utf-8');
      expect(content).toContain('@UseGuards(AuthGuard(\'jwt\'))');
    });

    it('should import AuthGuard from @nestjs/passport', () => {
      const content = fs.readFileSync(path.join(dir, 'ai-assistant.controller.ts'), 'utf-8');
      expect(content).toContain("import { AuthGuard } from '@nestjs/passport'");
    });
  });

  describe('MonitoringController auth', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'monitoring');

    it('should have monitoring.controller.ts with UseGuards decorator', () => {
      const content = fs.readFileSync(path.join(dir, 'monitoring.controller.ts'), 'utf-8');
      expect(content).toContain('@UseGuards(AuthGuard(\'jwt\'))');
    });

    it('should import AuthGuard from @nestjs/passport', () => {
      const content = fs.readFileSync(path.join(dir, 'monitoring.controller.ts'), 'utf-8');
      expect(content).toContain("import { AuthGuard } from '@nestjs/passport'");
    });
  });

  describe('RateLimiterController auth', () => {
    const dir = path.join(rootDir, 'src', 'modules', 'rate-limiter');

    it('should have rate-limiter.controller.ts with UseGuards and Roles guards', () => {
      const content = fs.readFileSync(path.join(dir, 'rate-limiter.controller.ts'), 'utf-8');
      expect(content).toContain('@UseGuards(AuthGuard(\'jwt\'), RolesGuard)');
    });

    it('should have @Roles(\'admin\') decorator on controller', () => {
      const content = fs.readFileSync(path.join(dir, 'rate-limiter.controller.ts'), 'utf-8');
      expect(content).toContain("@Roles('admin')");
    });

    it('should have getRateLimitStatus endpoint', () => {
      const content = fs.readFileSync(path.join(dir, 'rate-limiter.controller.ts'), 'utf-8');
      expect(content).toContain('getRateLimitStatus');
    });

    it('should have resetRateLimit endpoint', () => {
      const content = fs.readFileSync(path.join(dir, 'rate-limiter.controller.ts'), 'utf-8');
      expect(content).toContain('resetRateLimit');
    });

    it('should have getStatus method on RateLimiterService', () => {
      const content = fs.readFileSync(path.join(dir, 'rate-limiter.service.ts'), 'utf-8');
      expect(content).toContain('getStatus');
    });

    it('should have resetLimit method on RateLimiterService', () => {
      const content = fs.readFileSync(path.join(dir, 'rate-limiter.service.ts'), 'utf-8');
      expect(content).toContain('resetLimit');
    });
  });

  describe('Existing Phase 4 controllers maintain auth', () => {
    it('should have analytics controller with admin role guard', () => {
      const content = fs.readFileSync(path.join(rootDir, 'src', 'modules', 'analytics', 'analytics.controller.ts'), 'utf-8');
      expect(content).toContain('@Roles(\'admin\')');
    });

    it('should have reporting controller with admin role guard', () => {
      const content = fs.readFileSync(path.join(rootDir, 'src', 'modules', 'reporting', 'reporting.controller.ts'), 'utf-8');
      expect(content).toContain('@Roles(\'admin\')');
    });

    it('should have loyalty controller with JWT guard', () => {
      const content = fs.readFileSync(path.join(rootDir, 'src', 'modules', 'loyalty', 'loyalty.controller.ts'), 'utf-8');
      expect(content).toContain('@UseGuards(AuthGuard(\'jwt\'))');
    });

    it('should have referral controller with JWT guard', () => {
      const content = fs.readFileSync(path.join(rootDir, 'src', 'modules', 'referral', 'referral.controller.ts'), 'utf-8');
      expect(content).toContain('@UseGuards(AuthGuard(\'jwt\'))');
    });
  });
});
