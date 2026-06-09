import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'promotions', timestamps: true })
export class Promotion extends Model {
  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(50), unique: true })
  code: string;

  @Column({ type: DataType.ENUM('percentage', 'fixed'), allowNull: false })
  type: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  value: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  minOrderAmount: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  usageLimit: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  usedCount: number;

  @Column({ type: DataType.DATE, allowNull: false })
  startDate: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  endDate: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;
}
