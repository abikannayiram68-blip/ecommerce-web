import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { ProductsModule } from '../products/products.module';
import { RecentlyViewed } from './entities/recently-viewed.entity';

@Module({
  imports: [SequelizeModule.forFeature([RecentlyViewed]), ProductsModule],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
  exports: [SequelizeModule],
})
export class RecommendationsModule {}
