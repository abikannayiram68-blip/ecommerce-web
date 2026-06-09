import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'tax_rates', timestamps: true })
export class TaxRate extends Model {
  @Column({ type: DataType.STRING(2), allowNull: false })
  countryCode: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  region: string;

  @Column({ type: DataType.DECIMAL(5, 2), allowNull: false })
  rate: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  name: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;
}
