import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { VendorProduct } from './vendor-product.entity';

@Table({ tableName: 'vendors', timestamps: true })
export class Vendor extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING(200), allowNull: false })
  storeName: string;

  @Column({ type: DataType.STRING(200), unique: true, allowNull: false })
  slug: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  logoUrl: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  bannerUrl: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  email: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  phone: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  address: string;

  @Column({ type: DataType.ENUM('pending', 'active', 'suspended', 'rejected'), defaultValue: 'pending' })
  status: string;

  @Column({ type: DataType.DECIMAL(5, 2), allowNull: true })
  commissionRate: number;

  @Column({ type: DataType.DECIMAL(15, 2), defaultValue: 0 })
  totalSales: number;

  @Column({ type: DataType.DECIMAL(15, 2), defaultValue: 0 })
  totalPayout: number;

  @Column({ type: DataType.DECIMAL(3, 2), defaultValue: 0 })
  rating: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  reviewCount: number;

  @HasMany(() => VendorProduct)
  vendorProducts: VendorProduct[];
}
