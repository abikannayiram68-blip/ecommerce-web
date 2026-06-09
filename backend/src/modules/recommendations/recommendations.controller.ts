import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecommendationsService } from './recommendations.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller()
export class RecommendationsController {
  constructor(private recommendationsService: RecommendationsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('recommendations')
  async getRecommendations(@CurrentUser() user: any) {
    return this.recommendationsService.getRecommendations(user.id);
  }

  @Get('products/trending')
  async getTrending() {
    return this.recommendationsService.getTrending();
  }

  @Get('products/:id/related')
  async getRelated(@Param('id') id: number) {
    return this.recommendationsService.getRelated(id);
  }
}
