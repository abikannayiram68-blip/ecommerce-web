import { Controller, Get, Post, Put, Param, Body, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommissionService } from './commission.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('commission')
export class CommissionController {
  constructor(private commissionService: CommissionService) {}

  @Get('plans')
  async findAllPlans() {
    return this.commissionService.findAll();
  }

  @Get('plans/default')
  async getDefault() {
    return this.commissionService.getDefault();
  }

  @Get('plans/:id')
  async findPlanById(@Param('id') id: number) {
    return this.commissionService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('plans')
  async createPlan(@Body() body: any) {
    return this.commissionService.create(body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put('plans/:id')
  async updatePlan(@Param('id') id: number, @Body() body: any) {
    return this.commissionService.update(id, body);
  }

  @Get('calculate')
  async calculate(@Query('amount') amount: string, @Query('planId') planId?: string) {
    return this.commissionService.calculate(Number(amount), planId ? Number(planId) : undefined);
  }
}
