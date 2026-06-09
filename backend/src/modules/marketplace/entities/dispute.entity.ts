import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Vendor } from '../../vendor/entities/vendor.entity';
import { Order } from '../../orders/entities/order.entity';

@Table({ tableName: 'disputes', timestamps: true })
export class Dispute extends Model {
  @ForeignKey(() => Vendor)
  @Column({ type: DataType.INTEGER })
  vendorId: number;

  @BelongsTo(() => Vendor)
  vendor: Vendor;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @Column({ type: DataType.ENUM('buyer', 'seller', 'admin'), allowNull: false })
  raisedBy: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  reason: string;

  @Column({ type: DataType.ENUM('open', 'investigating', 'resolved', 'closed'), defaultValue: 'open' })
  status: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  resolution: string;
}
