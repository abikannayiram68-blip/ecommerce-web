import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'sales_summaries', timestamps: true, indexes: [{ unique: true, fields: ['period'] }] })
export class SalesSummary extends Model {
  @Column({ type: DataType.STRING(7), unique: true, allowNull: false })
  period: string;

  @Column({ type: DataType.DECIMAL(15, 2), defaultValue: 0 })
  totalRevenue: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  totalOrders: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  totalProducts: number;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  avgOrderValue: number;
}
