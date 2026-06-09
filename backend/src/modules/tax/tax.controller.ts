import { Controller, Get, Post, Put, Param, Body, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaxService } from './tax.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('taxes')
export class TaxController {
  constructor(private taxService: TaxService) {}

  @Get()
  async findAll() {
    return this.taxService.findAll();
  }

  @Get('calculate')
  async calculate(@Query('amount') amount: string, @Query('countryCode') countryCode: string, @Query('region') region?: string) {
    return this.taxService.calculate(Number(amount), countryCode, region);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.taxService.findById(id);
  }

  @Get('country/:countryCode')
  async findByCountry(@Param('countryCode') countryCode: string) {
    return this.taxService.findByCountry(countryCode);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() body: any) {
    return this.taxService.create(body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    return this.taxService.update(id, body);
  }
}
