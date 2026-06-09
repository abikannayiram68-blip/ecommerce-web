import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async findAll() {
    return this.categoryModel.findAll({ where: { isActive: true } });
  }

  async findBySlug(slug: string) {
    const category = await this.categoryModel.findOne({
      where: { slug, isActive: true },
      include: [{ model: Product, where: { isActive: true }, required: false }],
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(data: Partial<Category>) {
    return this.categoryModel.create(data);
  }
}
