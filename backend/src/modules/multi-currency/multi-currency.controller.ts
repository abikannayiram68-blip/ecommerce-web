import { Controller, Get, Post, Put, Param, Body, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MultiCurrencyService } from './multi-currency.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('currencies')
export class MultiCurrencyController {
  constructor(private currencyService: MultiCurrencyService) {}

  @Get()
  async findAll() {
    return this.currencyService.findAll();
  }

  @Get('base')
  async getBase() {
    return this.currencyService.getBase();
  }

  @Get('convert')
  async convert(@Query('amount') amount: string, @Query('from') from: string, @Query('to') to: string) {
    return this.currencyService.convert(Number(amount), from, to);
  }

  @Get(':code')
  async findByCode(@Param('code') code: string) {
    return this.currencyService.findByCode(code);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() body: any) {
    return this.currencyService.create(body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    return this.currencyService.update(id, body);
  }
}
