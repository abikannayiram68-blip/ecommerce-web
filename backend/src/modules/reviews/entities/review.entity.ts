import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Table({ tableName: 'reviews', timestamps: true })
export class Review extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column({ type: DataType.TINYINT, allowNull: false })
  rating: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  comment: string;

  @Column({ type: DataType.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' })
  status: string;
}
