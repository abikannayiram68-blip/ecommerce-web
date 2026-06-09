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
import { CommissionModule } from './modules/commission/commission.module';
import { PayoutModule } from './modules/payout/payout.module';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { VendorStorefrontModule } from './modules/vendor-storefront/vendor-storefront.module';
import { MultiCurrencyModule } from './modules/multi-currency/multi-currency.module';
import { TaxModule } from './modules/tax/tax.module';

@Module({
  imports: [
    HealthModule,
    QueueModule,
    SearchModule,
    DatabaseModule,
    RedisModule,
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
    CommissionModule,
    PayoutModule,
    MarketplaceModule,
    VendorStorefrontModule,
    MultiCurrencyModule,
    TaxModule,
  ],
})
export class AppModule {}
