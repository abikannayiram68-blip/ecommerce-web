import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Vendor } from '../../vendor/entities/vendor.entity';
import { User } from '../../users/entities/user.entity';

@Table({ tableName: 'vendor_messages', timestamps: true })
export class VendorMessage extends Model {
  @ForeignKey(() => Vendor)
  @Column({ type: DataType.INTEGER })
  vendorId: number;

  @BelongsTo(() => Vendor)
  vendor: Vendor;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.TEXT, allowNull: false })
  message: string;

  @Column({ type: DataType.ENUM('to_vendor', 'from_vendor'), allowNull: false })
  direction: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  read: boolean;
}
