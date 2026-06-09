import { Controller, Get, Post, Put, Param, Body, UseGuards, Query, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { VendorService } from './vendor.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('vendors')
export class VendorController {
  constructor(private vendorService: VendorService) {}

  @Get()
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 20) {
    return this.vendorService.findAll(page, limit);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.vendorService.findById(id);
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.vendorService.findBySlug(slug);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  async register(@CurrentUser() user: any, @Body() body: any) {
    return this.vendorService.create(user.id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my/profile')
  async myProfile(@CurrentUser() user: any) {
    try {
      return await this.vendorService.findByUser(user.id);
    } catch (err) {
      return null;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my/dashboard')
  async myDashboard(@CurrentUser() user: any) {
    const vendor = await this.vendorService.findByUser(user.id);
    return this.vendorService.getDashboard(vendor.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('my/profile')
  async updateProfile(@CurrentUser() user: any, @Body() body: any) {
    const vendor = await this.vendorService.findByUser(user.id);
    return this.vendorService.update(vendor.id, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('vendor')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('vendor')
  @Post('my/products')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(@CurrentUser() user: any, @Body() body: any, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
      ],
      fileIsRequired: false,
    })
  ) file?: Express.Multer.File) {
    const vendor = await this.vendorService.findByUser(user.id);
    return this.vendorService.createProduct(vendor.id, body, file);
  }
}
