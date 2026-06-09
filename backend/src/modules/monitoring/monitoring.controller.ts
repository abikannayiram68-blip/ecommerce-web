import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MonitoringService } from './monitoring.service';

@Controller('monitoring')
@UseGuards(AuthGuard('jwt'))
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get('health')
  async getSystemHealth() {
    return this.monitoringService.getSystemHealth();
  }
}
