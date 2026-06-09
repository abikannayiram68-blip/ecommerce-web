import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table({ tableName: 'referrals', timestamps: true })
export class Referral extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  referrerId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  refereeId: number;

  @Column({ type: DataType.STRING(20), defaultValue: 'pending' })
  status: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  rewardPoints: number;
}
