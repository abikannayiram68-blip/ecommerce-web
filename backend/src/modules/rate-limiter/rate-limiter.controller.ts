import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RateLimiterService } from './rate-limiter.service';

@Controller('rate-limiter')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class RateLimiterController {
  constructor(private readonly rateLimiterService: RateLimiterService) {}

  @Get('status')
  async getRateLimitStatus() {
    return this.rateLimiterService.getStatus();
  }

  @Post('reset')
  async resetRateLimit(@Body('key') key: string) {
    return this.rateLimiterService.resetLimit(key);
  }
}
