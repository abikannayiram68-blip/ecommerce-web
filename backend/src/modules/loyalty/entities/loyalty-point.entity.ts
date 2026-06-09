import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({ tableName: 'loyalty_points', timestamps: true, indexes: [{ unique: true, fields: ['userId'] }] })
export class LoyaltyPoint extends Model {
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  points: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  balance: number;

  @Column({ type: DataType.STRING(100), allowNull: true })
  reason: string;
}
