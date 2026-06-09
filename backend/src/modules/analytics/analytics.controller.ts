import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnalyticsService } from './analytics.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('analytics')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('conversion')
  async getConversionRate(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.analyticsService.getConversionRate(startDate, endDate);
  }

  @Get('segments')
  async getCustomerSegments() {
    return this.analyticsService.getCustomerSegments();
  }
}
