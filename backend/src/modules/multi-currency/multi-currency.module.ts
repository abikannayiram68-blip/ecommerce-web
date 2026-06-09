import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MultiCurrencyService } from './multi-currency.service';
import { MultiCurrencyController } from './multi-currency.controller';
import { Currency } from './entities/currency.entity';

@Module({
  imports: [SequelizeModule.forFeature([Currency])],
  controllers: [MultiCurrencyController],
  providers: [MultiCurrencyService],
  exports: [MultiCurrencyService],
})
export class MultiCurrencyModule {}
