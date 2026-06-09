import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from './order.entity';
import { User } from '../../users/entities/user.entity';

@Table({ tableName: 'order_status_history', timestamps: true })
export class OrderStatusHistory extends Model {
  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @Column({ type: DataType.STRING(50), allowNull: true })
  fromStatus: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  toStatus: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  changedBy: number;

  @BelongsTo(() => User)
  changedByUser: User;
}
