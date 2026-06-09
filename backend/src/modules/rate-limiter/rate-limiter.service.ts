import { Injectable } from '@nestjs/common';

@Injectable()
export class RateLimiterService {
  private store = new Map<string, { count: number; resetAt: number }>();

  async checkRate(key: string, maxRequests: number = 100, windowMs: number = 60000) {
    const now = Date.now();
    const record = this.store.get(key);
    if (!record || now > record.resetAt) {
      this.store.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, remaining: maxRequests - 1 };
    }
    if (record.count >= maxRequests) {
      return { allowed: false, remaining: 0 };
    }
    record.count++;
    return { allowed: true, remaining: maxRequests - record.count };
  }

  async getStatus() {
    const now = Date.now();
    const entries: any[] = [];
    for (const [key, record] of this.store.entries()) {
      entries.push({ key, count: record.count, resetAt: new Date(record.resetAt).toISOString(), remaining: record.resetAt > now ? Math.max(0, 100 - record.count) : 100 });
    }
    return { entries, totalKeys: entries.length };
  }

  async resetLimit(key: string) {
    this.store.delete(key);
    return { success: true };
  }
}
