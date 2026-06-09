import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReportingService } from './reporting.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('reports')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('sales')
  async getSalesReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.reportingService.getSalesReport(startDate, endDate);
  }

  @Get('revenue')
  async getRevenueSummary(@Query('period') period: string) {
    return this.reportingService.getRevenueSummary(period);
  }
}
