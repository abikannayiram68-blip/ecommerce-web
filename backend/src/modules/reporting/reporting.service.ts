import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SalesSummary } from './entities/sales-summary.entity';

@Injectable()
export class ReportingService {
  constructor(@InjectModel(SalesSummary) private salesSummaryModel: typeof SalesSummary) {}

  async getSalesReport(startDate: string, endDate: string) {
    const summaries = await this.salesSummaryModel.findAll({
      where: { period: { $between: [startDate.slice(0, 7), endDate.slice(0, 7)] } },
      order: [['period', 'ASC']],
    });
    return { startDate, endDate, summaries };
  }

  async getRevenueSummary(period: string) {
    const summary = await this.salesSummaryModel.findOne({ where: { period } });
    return summary || { period, totalRevenue: 0, totalOrders: 0, totalProducts: 0, avgOrderValue: 0 };
  }
}
