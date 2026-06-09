import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Vendor } from '../../vendor/entities/vendor.entity';

@Table({ tableName: 'payouts', timestamps: true })
export class Payout extends Model {
  @ForeignKey(() => Vendor)
  @Column({ type: DataType.INTEGER })
  vendorId: number;

  @BelongsTo(() => Vendor)
  vendor: Vendor;

  @Column({ type: DataType.DECIMAL(15, 2), allowNull: false })
  amount: number;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  fee: number;

  @Column({ type: DataType.ENUM('pending', 'processing', 'completed', 'failed'), defaultValue: 'pending' })
  status: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  paymentMethod: string;

  @Column({ type: DataType.STRING(200), allowNull: true })
  paymentRef: string;

  @Column({ type: DataType.DATE, allowNull: true })
  paidAt: Date;
}
