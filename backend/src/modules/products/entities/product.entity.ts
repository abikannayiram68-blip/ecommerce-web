import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Category } from '../../categories/entities/category.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';
import { CartItem } from '../../cart/entities/cart-item.entity';
import { WishlistItem } from '../../wishlist/entities/wishlist-item.entity';
import { Review } from '../../reviews/entities/review.entity';
import { ProductImage } from './product-image.entity';

@Table({
  tableName: 'products',
  timestamps: true,
  indexes: [
    { type: 'FULLTEXT', name: 'idx_products_search', fields: ['name', 'description'] },
  ],
})
export class Product extends Model {
  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(255), unique: true, allowNull: false })
  slug: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  comparePrice: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  stock: number;

  @Column({ type: DataType.STRING(100), unique: true })
  sku: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isFeatured: boolean;

  @Column({ type: DataType.DECIMAL(2, 1), defaultValue: 0 })
  averageRating: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  reviewCount: number;

  @HasMany(() => ProductImage)
  images: ProductImage[];

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @HasMany(() => CartItem)
  cartItems: CartItem[];

  @HasMany(() => WishlistItem)
  wishlistItems: WishlistItem[];

  @HasMany(() => Review)
  reviews: Review[];
}
