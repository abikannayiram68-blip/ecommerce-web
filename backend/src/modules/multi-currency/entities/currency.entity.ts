import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'currencies', timestamps: true })
export class Currency extends Model {
  @Column({ type: DataType.STRING(3), unique: true, allowNull: false })
  code: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(10), allowNull: false })
  symbol: string;

  @Column({ type: DataType.DECIMAL(15, 6), allowNull: false })
  exchangeRate: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBase: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;
}
