import { Module } from '@nestjs/common';

@Module({})
export class ConfigModule {
  constructor() {
    if (!process.env.JWT_SECRET) {
      process.env.JWT_SECRET = 'dev-secret-change-in-production';
    }
    if (!process.env.SELLER_COMMISSION_RATE) {
      process.env.SELLER_COMMISSION_RATE = '10';
    }
    if (!process.env.SELLER_MIN_PAYOUT) {
      process.env.SELLER_MIN_PAYOUT = '50';
    }
    if (!process.env.SELLER_ONBOARDING_FEE) {
      process.env.SELLER_ONBOARDING_FEE = '0';
    }
    if (!process.env.SELLER_MAX_PENDING_PAYOUT) {
      process.env.SELLER_MAX_PENDING_PAYOUT = '5000';
    }
  }
}
