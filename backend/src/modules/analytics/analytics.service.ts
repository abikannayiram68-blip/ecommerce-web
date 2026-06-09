import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  async getConversionRate(startDate?: string, endDate?: string) {
    return { conversionRate: 0, startDate, endDate };
  }

  async getCustomerSegments() {
    return { segments: [] };
  }
}
