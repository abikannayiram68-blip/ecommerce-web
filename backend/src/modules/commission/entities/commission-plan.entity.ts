import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'commission_plans', timestamps: true })
export class CommissionPlan extends Model {
  @Column({ type: DataType.STRING(100), allowNull: false })
  name: string;

  @Column({ type: DataType.DECIMAL(5, 2), allowNull: false })
  rate: number;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  minPayout: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  maxPendingPayout: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDefault: boolean;
}
