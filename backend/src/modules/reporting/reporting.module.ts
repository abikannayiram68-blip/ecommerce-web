import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReportingService } from './reporting.service';
import { ReportingController } from './reporting.controller';
import { SalesSummary } from './entities/sales-summary.entity';

@Module({
  imports: [SequelizeModule.forFeature([SalesSummary])],
  controllers: [ReportingController],
  providers: [ReportingService],
  exports: [SequelizeModule, ReportingService],
})
export class ReportingModule {}
