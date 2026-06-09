import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from './config.module';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Admin@1234',
      database: process.env.DB_NAME || 'ecommerce_db',
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
  ],
})
export class DatabaseModule { }
