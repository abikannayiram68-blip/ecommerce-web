import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';
import { OrdersModule } from '../orders/orders.module';
import { UsersModule } from '../users/users.module';
import { VendorModule } from '../vendor/vendor.module';

@Module({
  imports: [SequelizeModule.forFeature([Product, Order, User]), ProductsModule, CategoriesModule, OrdersModule, UsersModule, VendorModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
