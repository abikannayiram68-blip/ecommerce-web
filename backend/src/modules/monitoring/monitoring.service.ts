import { Injectable } from '@nestjs/common';

@Injectable()
export class MonitoringService {
  async getSystemHealth() {
    return { status: 'healthy', uptime: process.uptime(), timestamp: new Date().toISOString() };
  }
}
