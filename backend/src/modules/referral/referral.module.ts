import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReferralService } from './referral.service';
import { ReferralController } from './referral.controller';
import { Referral } from './entities/referral.entity';

@Module({
  imports: [SequelizeModule.forFeature([Referral])],
  controllers: [ReferralController],
  providers: [ReferralService],
  exports: [SequelizeModule, ReferralService],
})
export class ReferralModule {}
