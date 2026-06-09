import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Product } from '../../products/entities/product.entity';

@Table({ tableName: 'recently_viewed', timestamps: true })
export class RecentlyViewed extends Model {
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;
}
