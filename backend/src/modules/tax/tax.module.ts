import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaxService } from './tax.service';
import { TaxController } from './tax.controller';
import { TaxRate } from './entities/tax-rate.entity';

@Module({
  imports: [SequelizeModule.forFeature([TaxRate])],
  controllers: [TaxController],
  providers: [TaxService],
  exports: [TaxService],
})
export class TaxModule {}
