import * as fs from 'fs';
import * as path from 'path';

describe('IT-P4-010: Phase 4 Deployment — Docker, env vars, CI/CD, monitoring stack', () => {
  const rootDir = path.resolve(__dirname, '../../..');

  describe('Phase 4 env vars in docker-compose', () => {
    const composePath = path.join(rootDir, 'docker-compose.yml');
    const compose = fs.readFileSync(composePath, 'utf-8');

    it('should have LOYALTY_POINTS_PER_DOLLAR env var on api service', () => {
      expect(compose).toContain('LOYALTY_POINTS_PER_DOLLAR');
    });

    it('should have REFERRAL_REWARD_POINTS env var on api service', () => {
      expect(compose).toContain('REFERRAL_REWARD_POINTS');
    });

    it('should have AI_ASSISTANT_ENABLED env var on api service', () => {
      expect(compose).toContain('AI_ASSISTANT_ENABLED');
    });

    it('should have default values for all Phase 4 env vars', () => {
      expect(compose).toContain('LOYALTY_POINTS_PER_DOLLAR:-1');
      expect(compose).toContain('REFERRAL_REWARD_POINTS:-100');
      expect(compose).toContain('AI_ASSISTANT_ENABLED:-true');
    });

    it('should have Prometheus healthcheck configured', () => {
      expect(compose).toContain('prometheus');
      expect(compose).toContain('9090');
    });

    it('should have Grafana healthcheck configured', () => {
      expect(compose).toContain('grafana');
      expect(compose).toContain('3001');
      expect(compose).toContain('GF_SECURITY_ADMIN_PASSWORD');
    });
  });

  describe('Phase 4 env vars in .env.example', () => {
    const envPath = path.join(rootDir, '.env.example');

    it('should have LOYALTY_POINTS_PER_DOLLAR in .env.example', () => {
      const content = fs.readFileSync(envPath, 'utf-8');
      expect(content).toContain('LOYALTY_POINTS_PER_DOLLAR');
    });

    it('should have REFERRAL_REWARD_POINTS in .env.example', () => {
      const content = fs.readFileSync(envPath, 'utf-8');
      expect(content).toContain('REFERRAL_REWARD_POINTS');
    });

    it('should have AI_ASSISTANT_ENABLED in .env.example', () => {
      const content = fs.readFileSync(envPath, 'utf-8');
      expect(content).toContain('AI_ASSISTANT_ENABLED');
    });

    it('should have Ecosystem section header in .env.example', () => {
      const content = fs.readFileSync(envPath, 'utf-8');
      expect(content).toContain('Ecosystem');
    });
  });

  describe('CI/CD pipeline', () => {
    const ciPath = path.join(rootDir, '.github', 'workflows', 'ci.yml');
    const deployPath = path.join(rootDir, '.github', 'workflows', 'deploy.yml');

    it('should have CI workflow with backend test step', () => {
      const content = fs.readFileSync(ciPath, 'utf-8');
      expect(content).toContain('npm test');
    });

    it('should have CI workflow with frontend test step', () => {
      const content = fs.readFileSync(ciPath, 'utf-8');
      expect(content).toContain('npm test');
    });

    it('should have CI workflow building frontend', () => {
      const content = fs.readFileSync(ciPath, 'utf-8');
      expect(content).toContain('npm run build');
    });

    it('should have deploy workflow with backend tests', () => {
      const content = fs.readFileSync(deployPath, 'utf-8');
      expect(content).toContain('Run backend tests');
    });

    it('should have deploy workflow with frontend tests', () => {
      const content = fs.readFileSync(deployPath, 'utf-8');
      expect(content).toContain('Run frontend tests');
    });

    it('should have deploy workflow building Docker images', () => {
      const content = fs.readFileSync(deployPath, 'utf-8');
      expect(content).toContain('docker build');
    });
  });

  describe('Monitoring stack config files', () => {
    it('should have prometheus config file with api scrape target', () => {
      const content = fs.readFileSync(path.join(rootDir, 'prometheus', 'prometheus.yml'), 'utf-8');
      expect(content).toContain('api');
      expect(content).toContain('3000');
    });

    it('should have grafana datasource config referencing Prometheus', () => {
      const files = fs.readdirSync(path.join(rootDir, 'grafana', 'datasources'));
      expect(files.length).toBeGreaterThan(0);
      const content = fs.readFileSync(path.join(rootDir, 'grafana', 'datasources', files[0]), 'utf-8');
      expect(content).toContain('prometheus');
    });

    it('should have nginx config with gzip compression', () => {
      const content = fs.readFileSync(path.join(rootDir, 'nginx', 'nginx.conf'), 'utf-8');
      expect(content).toContain('gzip');
    });
  });
});
