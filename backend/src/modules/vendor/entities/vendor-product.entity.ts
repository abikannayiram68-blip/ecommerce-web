import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Vendor } from './vendor.entity';
import { Product } from '../../products/entities/product.entity';

@Table({ tableName: 'vendor_products', timestamps: true })
export class VendorProduct extends Model {
  @ForeignKey(() => Vendor)
  @Column({ type: DataType.INTEGER })
  vendorId: number;

  @BelongsTo(() => Vendor)
  vendor: Vendor;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  stock: number;

  @Column({ type: DataType.ENUM('active', 'inactive', 'discontinued'), defaultValue: 'active' })
  status: string;
}
