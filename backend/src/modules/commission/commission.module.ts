import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommissionService } from './commission.service';
import { CommissionController } from './commission.controller';
import { CommissionPlan } from './entities/commission-plan.entity';

@Module({
  imports: [SequelizeModule.forFeature([CommissionPlan])],
  controllers: [CommissionController],
  providers: [CommissionService],
  exports: [CommissionService],
})
export class CommissionModule {}
