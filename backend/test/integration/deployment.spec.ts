import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

describe('IT-NFR-009: Docker compose services start', () => {
  const rootDir = path.resolve(__dirname, '../../..');

  it('should have a docker-compose.yml at project root', () => {
    const composePath = path.join(rootDir, 'docker-compose.yml');
    expect(fs.existsSync(composePath)).toBe(true);
    const content = fs.readFileSync(composePath, 'utf-8');
    expect(content).toContain('services:');
  });

  it('should have a backend Dockerfile', () => {
    const dockerfile = path.join(rootDir, 'backend', 'Dockerfile');
    expect(fs.existsSync(dockerfile)).toBe(true);
    const content = fs.readFileSync(dockerfile, 'utf-8');
    expect(content).toContain('FROM node:20-alpine');
    expect(content).toContain('EXPOSE');
  });

  it('should have a frontend Dockerfile', () => {
    const dockerfile = path.join(rootDir, 'frontend', 'Dockerfile');
    expect(fs.existsSync(dockerfile)).toBe(true);
    const content = fs.readFileSync(dockerfile, 'utf-8');
    expect(content).toContain('FROM node:20-alpine');
    expect(content).toContain('FROM nginx:stable-alpine');
  });

  it('should have an nginx config', () => {
    const nginxConf = path.join(rootDir, 'nginx', 'nginx.conf');
    expect(fs.existsSync(nginxConf)).toBe(true);
    const content = fs.readFileSync(nginxConf, 'utf-8');
    expect(content).toContain('proxy_pass');
  });

  it('should have a GitHub Actions CI workflow', () => {
    const ciPath = path.join(rootDir, '.github', 'workflows', 'ci.yml');
    expect(fs.existsSync(ciPath)).toBe(true);
    const content = fs.readFileSync(ciPath, 'utf-8');
    expect(content).toContain('name: CI');
  });

  it('should have a GitHub Actions deploy workflow', () => {
    const deployPath = path.join(rootDir, '.github', 'workflows', 'deploy.yml');
    expect(fs.existsSync(deployPath)).toBe(true);
    const content = fs.readFileSync(deployPath, 'utf-8');
    expect(content).toContain('name: Deploy');
  });

  it('should have all docker-compose services defined', () => {
    const composePath = path.join(rootDir, 'docker-compose.yml');
    const content = fs.readFileSync(composePath, 'utf-8');
    expect(content).toContain('api:');
    expect(content).toContain('db:');
    expect(content).toContain('redis:');
  });

  it('should have health checks in docker-compose services', () => {
    const composePath = path.join(rootDir, 'docker-compose.yml');
    const content = fs.readFileSync(composePath, 'utf-8');
    expect(content).toContain('healthcheck');
  });

  it('should have Nginx reverse proxy to api service', () => {
    const nginxConf = path.join(rootDir, 'nginx', 'nginx.conf');
    const content = fs.readFileSync(nginxConf, 'utf-8');
    expect(content).toContain('http://api:3000');
  });
});
