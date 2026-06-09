import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatusHistory } from './order-status-history.entity';

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model {
  @Column({ type: DataType.STRING(50), unique: true, allowNull: false })
  orderNumber: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'), defaultValue: 'pending' })
  status: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  subtotal: number;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  discount: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  total: number;

  @Column({ type: DataType.JSON, allowNull: false })
  shippingAddress: object;

  @Column({ type: DataType.STRING(50), allowNull: true })
  paymentMethod: string;

  @Column({ type: DataType.ENUM('pending', 'paid', 'failed', 'refunded'), defaultValue: 'pending' })
  paymentStatus: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  trackingNumber: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  notes: string;

  @HasMany(() => OrderItem)
  items: OrderItem[];

  @HasMany(() => OrderStatusHistory)
  statusHistory: OrderStatusHistory[];
}
