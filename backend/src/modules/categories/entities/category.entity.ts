import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from '../../products/entities/product.entity';

@Table({ tableName: 'categories', timestamps: true })
export class Category extends Model {
  @Column({ type: DataType.STRING(255), unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(255), unique: true, allowNull: false })
  slug: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  image: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  @HasMany(() => Product)
  products: Product[];
}
