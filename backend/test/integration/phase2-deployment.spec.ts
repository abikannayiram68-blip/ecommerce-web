import * as fs from 'fs';
import * as path from 'path';

describe('IT-NFR-010: Phase 2 deployment configuration', () => {
  const rootDir = path.resolve(__dirname, '../../..');
  const composePath = path.join(rootDir, 'docker-compose.yml');
  const deployPath = path.join(rootDir, '.github', 'workflows', 'deploy.yml');

  it('should have redis service configured for BullMQ', () => {
    const content = fs.readFileSync(composePath, 'utf-8');
    expect(content).toMatch(/redis:7-alpine/);
    expect(content).toMatch(/redis-cli.*ping/);
  });

  it('should have Redis env vars on api service', () => {
    const content = fs.readFileSync(composePath, 'utf-8');
    expect(content).toContain('REDIS_HOST: redis');
    expect(content).toContain('REDIS_PORT: 6379');
  });

  it('should have db service configured with MySQL 8.0', () => {
    const content = fs.readFileSync(composePath, 'utf-8');
    expect(content).toMatch(/mysql:8.0/);
    expect(content).toContain('MYSQL_ROOT_PASSWORD');
    expect(content).toContain('MYSQL_DATABASE');
  });

  it('should have nginx reverse proxy to api service', () => {
    const nginxConf = path.join(rootDir, 'nginx', 'nginx.conf');
    const content = fs.readFileSync(nginxConf, 'utf-8');
    expect(content).toContain('proxy_pass http://api:3000');
    expect(content).toContain('location /api');
    expect(content).toContain('try_files $uri $uri/ /index.html');
  });

  it('should have all required env variables in api service', () => {
    const content = fs.readFileSync(composePath, 'utf-8');
    const envVars = ['PORT: 3000', 'NODE_ENV: production', 'DB_HOST: db', 'DB_PORT: 3306',
      'REDIS_HOST: redis', 'REDIS_PORT: 6379', 'JWT_SECRET', 'JWT_EXPIRES_IN',
      'FRONTEND_URL', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_CALLBACK_URL'];
    envVars.forEach((env) => expect(content).toContain(env));
  });

  it('should have deploy workflow with build steps', () => {
    const content = fs.readFileSync(deployPath, 'utf-8');
    expect(content).toContain('name: Deploy');
    expect(content).toContain('docker build');
    expect(content).toContain('docker-compose up');
  });

  it('should have api depends_on db and redis with health conditions', () => {
    const content = fs.readFileSync(composePath, 'utf-8');
    expect(content).toContain('depends_on');
    expect(content).toContain('condition: service_healthy');
  });

  it('should have all docker-compose services with healthcheck', () => {
    const content = fs.readFileSync(composePath, 'utf-8');
    const healthCount = (content.match(/healthcheck:/g) || []).length;
    expect(healthCount).toBeGreaterThanOrEqual(4);
  });

  it('should have nginx depends_on api', () => {
    const content = fs.readFileSync(composePath, 'utf-8');
    const nginxSection = content.slice(content.indexOf('nginx:'));
    expect(nginxSection).toContain('depends_on');
    expect(nginxSection).toContain('condition: service_healthy');
  });
});
