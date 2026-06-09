import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyPoint } from './entities/loyalty-point.entity';

@Module({
  imports: [SequelizeModule.forFeature([LoyaltyPoint])],
  controllers: [LoyaltyController],
  providers: [LoyaltyService],
  exports: [SequelizeModule, LoyaltyService],
})
export class LoyaltyModule {}
