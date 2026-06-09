import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Order } from '../../orders/entities/order.entity';
import { CartItem } from '../../cart/entities/cart-item.entity';
import { WishlistItem } from '../../wishlist/entities/wishlist-item.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Notification } from '../../notifications/entities/notification.entity';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @Column({ type: DataType.STRING(255), unique: true, allowNull: true })
  googleId: string;

  @Column({ type: DataType.STRING(255), unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  avatar: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  phone: string;

  @Column({ type: DataType.ENUM('customer', 'admin'), defaultValue: 'customer' })
  role: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => CartItem)
  cartItems: CartItem[];

  @HasMany(() => WishlistItem)
  wishlistItems: WishlistItem[];

  @HasMany(() => Review)
  reviews: Review[];

  @HasMany(() => Notification)
  notifications: Notification[];
}
