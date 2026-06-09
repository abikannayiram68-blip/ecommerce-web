import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PayoutService } from './payout.service';
import { PayoutController } from './payout.controller';
import { Payout } from './entities/payout.entity';
import { Vendor } from '../vendor/entities/vendor.entity';

@Module({
  imports: [SequelizeModule.forFeature([Payout, Vendor])],
  controllers: [PayoutController],
  providers: [PayoutService],
  exports: [PayoutService],
})
export class PayoutModule {}
