import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { User } from '../../modules/users/entities/user.entity';
import { Category } from '../../modules/categories/entities/category.entity';
import { Product } from '../../modules/products/entities/product.entity';
import { Promotion } from '../../modules/promotions/entities/promotion.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const user = await User.create({
    googleId: 'seed-google-id',
    email: 'admin@ecommerce.com',
    name: 'Admin User',
    role: 'admin',
  });
  console.log('Created admin user:', user.id);

  const categories = await Category.bulkCreate([
    { name: 'Electronics', slug: 'electronics', description: 'Gadgets and devices' },
    { name: 'Clothing', slug: 'clothing', description: 'Apparel and fashion' },
    { name: 'Home & Garden', slug: 'home-garden', description: 'Home improvement and garden' },
    { name: 'Sports', slug: 'sports', description: 'Sports and outdoor' },
    { name: 'Books', slug: 'books', description: 'Books and media' },
  ]);
  console.log('Created categories:', categories.length);

  const products = await Product.bulkCreate([
    { name: 'Wireless Headphones', slug: 'wireless-headphones', description: 'Premium wireless headphones with noise cancellation', price: 149.99, stock: 50, sku: 'WH-001', categoryId: 1, isFeatured: true },
    { name: 'Smart Watch', slug: 'smart-watch', description: 'Fitness tracking smart watch', price: 199.99, stock: 30, sku: 'SW-001', categoryId: 1, isFeatured: true },
    { name: 'Cotton T-Shirt', slug: 'cotton-tshirt', description: 'Comfortable cotton t-shirt', price: 24.99, stock: 200, sku: 'CT-001', categoryId: 2 },
    { name: 'Denim Jeans', slug: 'denim-jeans', description: 'Classic denim jeans', price: 59.99, stock: 100, sku: 'DJ-001', categoryId: 2 },
    { name: 'Indoor Plant Pot', slug: 'indoor-plant-pot', description: 'Ceramic plant pot for indoor plants', price: 34.99, stock: 75, sku: 'PP-001', categoryId: 3 },
    { name: 'Yoga Mat', slug: 'yoga-mat', description: 'Non-slip yoga mat', price: 29.99, stock: 60, sku: 'YM-001', categoryId: 4 },
    { name: 'Running Shoes', slug: 'running-shoes', description: 'Lightweight running shoes', price: 89.99, stock: 40, sku: 'RS-001', categoryId: 4, isFeatured: true },
    { name: 'JavaScript Guide', slug: 'javascript-guide', description: 'Comprehensive JavaScript programming guide', price: 39.99, stock: 120, sku: 'BK-001', categoryId: 5 },
  ]);
  console.log('Created products:', products.length);

  await Promotion.create({
    name: 'Summer Sale',
    code: 'SUMMER20',
    type: 'percentage',
    value: 20,
    minOrderAmount: 50,
    startDate: new Date('2026-06-01'),
    endDate: new Date('2026-08-31'),
    isActive: true,
  });
  console.log('Created promotion');

  await app.close();
  console.log('Seed complete!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
