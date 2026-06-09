import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HealthModule } from './modules/health/health.module';
import { QueueModule } from './modules/queue/queue.module';
import { SearchModule } from './modules/search/search.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PromotionsModule } from './modules/promotions/promotions.module';
import { AdminModule } from './modules/admin/admin.module';
import { RecommendationsModule } from './modules/recommendations/recommendations.module';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { ReportingModule } from './modules/reporting/reporting.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { LoyaltyModule } from './modules/loyalty/loyalty.module';
import { ReferralModule } from './modules/referral/referral.module';
import { AIAssistantModule } from './modules/ai-assistant/ai-assistant.module';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { RateLimiterModule } from './modules/rate-limiter/rate-limiter.module';
import { MinioModule } from './modules/minio/minio.module';

import { RateLimiterMiddleware } from './modules/rate-limiter/rate-limiter.middleware';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';

@Module({
  imports: [
    HealthModule,
    // QueueModule,
    SearchModule,
    DatabaseModule,
    // RedisModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
    OrdersModule,
    WishlistModule,
    ReviewsModule,
    NotificationsModule,
    PromotionsModule,
    AdminModule,
    RecommendationsModule,
    VendorModule,
    ReportingModule,
    AnalyticsModule,
    LoyaltyModule,
    ReferralModule,
    AIAssistantModule,
    MonitoringModule,
    RateLimiterModule,
    MinioModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimiterMiddleware)
      .forRoutes('*');
  }
}
