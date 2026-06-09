import { Controller, Get, Param, Query, Post, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('categoryId') categoryId?: number,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
  ) {
    return this.productsService.findAll({ page, limit, categoryId, minPrice, maxPrice, sortBy, sortOrder });
  }

  @Get('search')
  async search(@Query('q') q: string) {
    return this.productsService.search(q);
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Post(':id/images')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @Param('id') id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB limit
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
      }),
    ) file: Express.Multer.File,
  ) {
    return this.productsService.uploadImage(id, file);
  }

  @Delete(':id/images/:imageId')
  async deleteImage(@Param('id') id: number, @Param('imageId') imageId: number) {
    return this.productsService.deleteImage(id, imageId);
  }

  @Get(':id/images')
  async getImages(@Param('id') id: number) {
    return this.productsService.getImages(id);
  }
}
