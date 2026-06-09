import * as fs from 'fs';
import * as path from 'path';

describe('IT-P4-001: Phase 4 Setup — monitoring stack and CDN', () => {
  const rootDir = path.resolve(__dirname, '../../..');
  const composePath = path.join(rootDir, 'docker-compose.yml');
  const envExample = path.join(rootDir, '.env.example');
  const nginxConf = path.join(rootDir, 'nginx', 'nginx.conf');

  describe('Step 1: Grafana and Prometheus setup', () => {
    it('should have grafana service in docker-compose', () => {
      const content = fs.readFileSync(composePath, 'utf-8');
      expect(content).toContain('grafana/grafana');
    });

    it('should have prometheus service in docker-compose', () => {
      const content = fs.readFileSync(composePath, 'utf-8');
      expect(content).toContain('prom/prometheus');
    });

    it('should have prometheus config file', () => {
      const promConfig = path.join(rootDir, 'prometheus', 'prometheus.yml');
      expect(fs.existsSync(promConfig)).toBe(true);
    });

    it('should have grafana datasource config', () => {
      const grafanaDir = path.join(rootDir, 'grafana');
      expect(fs.existsSync(grafanaDir)).toBe(true);
    });

    it('should have grafana dashboard provisioning', () => {
      const dashboardsDir = path.join(rootDir, 'grafana', 'dashboards');
      expect(fs.existsSync(dashboardsDir)).toBe(true);
    });

    it('should have grafana datasource yml', () => {
      const dsDir = path.join(rootDir, 'grafana', 'datasources');
      expect(fs.existsSync(dsDir)).toBe(true);
    });
  });

  describe('Step 2: Monitoring stack configuration', () => {
    it('should have grafana ports in docker-compose', () => {
      const content = fs.readFileSync(composePath, 'utf-8');
      expect(content).toContain('3001:3000');
    });

    it('should have prometheus ports in docker-compose', () => {
      const content = fs.readFileSync(composePath, 'utf-8');
      expect(content).toContain('9090:9090');
    });

    it('should have grafana depends_on prometheus', () => {
      const content = fs.readFileSync(composePath, 'utf-8');
      const grafanaSection = content.slice(content.indexOf('grafana'));
      expect(grafanaSection).toContain('prometheus');
    });

    it('should have monitoring env vars in docker-compose', () => {
      const content = fs.readFileSync(composePath, 'utf-8');
      expect(content).toContain('GF_SECURITY_ADMIN_PASSWORD');
    });

    it('should have prometheus scrape config for api service', () => {
      const promConfig = path.join(rootDir, 'prometheus', 'prometheus.yml');
      const content = fs.readFileSync(promConfig, 'utf-8');
      expect(content).toContain('api:3000');
    });
  });

  describe('Step 3: CDN configuration', () => {
    it('should have CDN cache headers in nginx config', () => {
      const content = fs.readFileSync(nginxConf, 'utf-8');
      expect(content).toContain('expires');
    });

    it('should have gzip compression in nginx config', () => {
      const content = fs.readFileSync(nginxConf, 'utf-8');
      expect(content).toContain('gzip');
    });

    it('should have static asset caching rules in nginx', () => {
      const content = fs.readFileSync(nginxConf, 'utf-8');
      expect(content).toContain('Cache-Control');
    });

    it('should have CDN env vars in .env.example', () => {
      const content = fs.readFileSync(envExample, 'utf-8');
      expect(content).toContain('CDN');
    });
  });
});
