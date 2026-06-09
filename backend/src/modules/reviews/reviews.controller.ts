import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReviewsService } from './reviews.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('products/:productId/reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get()
  async findByProduct(@Param('productId') productId: number) {
    return this.reviewsService.findByProduct(productId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@CurrentUser() user: any, @Param('productId') productId: number, @Body() body: { rating: number; comment?: string }) {
    return this.reviewsService.create(user.id, productId, body.rating, body.comment);
  }
}
