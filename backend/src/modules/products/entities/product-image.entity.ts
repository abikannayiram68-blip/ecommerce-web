import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './product.entity';

@Table({ tableName: 'product_images', timestamps: true })
export class ProductImage extends Model {
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column({ type: DataType.STRING(500), allowNull: false })
  imageUrl: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  imageKey: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  thumbnailUrl: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  altText: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isPrimary: boolean;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  sortOrder: number;
}
