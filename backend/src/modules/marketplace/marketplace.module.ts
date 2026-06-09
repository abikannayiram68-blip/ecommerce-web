import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MarketplaceService } from './marketplace.service';
import { MarketplaceController } from './marketplace.controller';
import { Dispute } from './entities/dispute.entity';
import { VendorMessage } from './entities/vendor-message.entity';

@Module({
  imports: [SequelizeModule.forFeature([Dispute, VendorMessage])],
  controllers: [MarketplaceController],
  providers: [MarketplaceService],
  exports: [MarketplaceService],
})
export class MarketplaceModule {}
