// File: /backend/src/database/migrations/20260609000000-initial-schema.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Users
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      googleId: { type: Sequelize.STRING(255), unique: true, allowNull: true },
      email: { type: Sequelize.STRING(255), unique: true, allowNull: false },
      passwordHash: { type: Sequelize.STRING(255), allowNull: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      avatar: { type: Sequelize.STRING(500), allowNull: true },
      phone: { type: Sequelize.STRING(20), allowNull: true },
      role: {
        type: Sequelize.ENUM('customer', 'admin', 'vendor'),
        defaultValue: 'customer',
      },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Categories
    await queryInterface.createTable('categories', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(255), unique: true, allowNull: false },
      slug: { type: Sequelize.STRING(255), unique: true, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      image: { type: Sequelize.STRING(500), allowNull: true },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Products
    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      slug: { type: Sequelize.STRING(255), unique: true, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      comparePrice: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
      stock: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      sku: { type: Sequelize.STRING(100), unique: true },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      isFeatured: { type: Sequelize.BOOLEAN, defaultValue: false },
      averageRating: { type: Sequelize.DECIMAL(2, 1), defaultValue: 0 },
      reviewCount: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.addIndex('products', ['name', 'description'], { type: 'FULLTEXT', name: 'idx_products_search' });

    // Product Images
    await queryInterface.createTable('product_images', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      productId: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      url: { type: Sequelize.STRING(500), allowNull: false },
      altText: { type: Sequelize.STRING(255), allowNull: true },
      isPrimary: { type: Sequelize.BOOLEAN, defaultValue: false },
      sortOrder: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Cart Items
    await queryInterface.createTable('cart_items', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.addIndex('cart_items', ['userId', 'productId'], { unique: true });

    // Orders
    await queryInterface.createTable('orders', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      orderNumber: { type: Sequelize.STRING(50), unique: true, allowNull: false },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: { type: Sequelize.ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'), defaultValue: 'pending' },
      subtotal: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      discount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
      total: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      shippingAddress: { type: Sequelize.JSON, allowNull: false },
      paymentMethod: { type: Sequelize.STRING(50), allowNull: true },
      paymentStatus: { type: Sequelize.ENUM('pending', 'paid', 'failed', 'refunded'), defaultValue: 'pending' },
      trackingNumber: { type: Sequelize.STRING(100), allowNull: true },
      notes: { type: Sequelize.TEXT, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Order Items
    await queryInterface.createTable('order_items', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      orderId: {
        type: Sequelize.INTEGER,
        references: { model: 'orders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      productName: { type: Sequelize.STRING(255), allowNull: false },
      productPrice: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      subtotal: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Order Status History
    await queryInterface.createTable('order_status_history', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      orderId: {
        type: Sequelize.INTEGER,
        references: { model: 'orders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      fromStatus: { type: Sequelize.STRING(50), allowNull: true },
      toStatus: { type: Sequelize.STRING(50), allowNull: false },
      changedBy: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Wishlist Items
    await queryInterface.createTable('wishlist_items', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.addIndex('wishlist_items', ['userId', 'productId'], { unique: true });

    // Reviews
    await queryInterface.createTable('reviews', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      rating: { type: Sequelize.TINYINT, allowNull: false },
      comment: { type: Sequelize.TEXT, allowNull: true },
      status: { type: Sequelize.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.addIndex('reviews', ['userId', 'productId'], { unique: true });

    // Notifications
    await queryInterface.createTable('notifications', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      type: { type: Sequelize.ENUM('order_update', 'promotion', 'recommendation', 'system'), allowNull: false },
      title: { type: Sequelize.STRING(255), allowNull: false },
      message: { type: Sequelize.TEXT, allowNull: false },
      isRead: { type: Sequelize.BOOLEAN, defaultValue: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Promotions
    await queryInterface.createTable('promotions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      code: { type: Sequelize.STRING(50), unique: true },
      type: { type: Sequelize.ENUM('percentage', 'fixed'), allowNull: false },
      value: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      minOrderAmount: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
      usageLimit: { type: Sequelize.INTEGER, allowNull: true },
      usedCount: { type: Sequelize.INTEGER, defaultValue: 0 },
      startDate: { type: Sequelize.DATE, allowNull: false },
      endDate: { type: Sequelize.DATE, allowNull: false },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Product Specifications
    await queryInterface.createTable('product_specifications', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      productId: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      key: { type: Sequelize.STRING(100), allowNull: false },
      value: { type: Sequelize.STRING(500), allowNull: false },
    });

    // Recently Viewed
    await queryInterface.createTable('recently_viewed', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      productId: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Vendors
    await queryInterface.createTable('vendors', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      storeName: { type: Sequelize.STRING(200), allowNull: false },
      slug: { type: Sequelize.STRING(200), unique: true, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      logoUrl: { type: Sequelize.STRING(500), allowNull: true },
      bannerUrl: { type: Sequelize.STRING(500), allowNull: true },
      email: { type: Sequelize.STRING(255), allowNull: false },
      phone: { type: Sequelize.STRING(50), allowNull: true },
      address: { type: Sequelize.TEXT, allowNull: true },
      status: { type: Sequelize.ENUM('pending', 'active', 'suspended', 'rejected'), defaultValue: 'pending' },
      commissionRate: { type: Sequelize.DECIMAL(5, 2), allowNull: true },
      totalSales: { type: Sequelize.DECIMAL(15, 2), defaultValue: 0 },
      totalPayout: { type: Sequelize.DECIMAL(15, 2), defaultValue: 0 },
      rating: { type: Sequelize.DECIMAL(3, 2), defaultValue: 0 },
      reviewCount: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Vendor Products
    await queryInterface.createTable('vendor_products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      vendorId: {
        type: Sequelize.INTEGER,
        references: { model: 'vendors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      price: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
      stock: { type: Sequelize.INTEGER, allowNull: true },
      status: { type: Sequelize.ENUM('active', 'inactive', 'discontinued'), defaultValue: 'active' },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Vendor Messages
    await queryInterface.createTable('vendor_messages', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      vendorId: {
        type: Sequelize.INTEGER,
        references: { model: 'vendors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      message: { type: Sequelize.TEXT, allowNull: false },
      direction: { type: Sequelize.ENUM('to_vendor', 'from_vendor'), allowNull: false },
      read: { type: Sequelize.BOOLEAN, defaultValue: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Disputes
    await queryInterface.createTable('disputes', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      vendorId: {
        type: Sequelize.INTEGER,
        references: { model: 'vendors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: { model: 'orders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      raisedBy: { type: Sequelize.ENUM('buyer', 'seller', 'admin'), allowNull: false },
      reason: { type: Sequelize.TEXT, allowNull: false },
      status: { type: Sequelize.ENUM('open', 'investigating', 'resolved', 'closed'), defaultValue: 'open' },
      resolution: { type: Sequelize.TEXT, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Commission Plans
    await queryInterface.createTable('commission_plans', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      rate: { type: Sequelize.DECIMAL(5, 2), allowNull: false },
      minPayout: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
      maxPendingPayout: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
      isDefault: { type: Sequelize.BOOLEAN, defaultValue: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Payouts
    await queryInterface.createTable('payouts', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      vendorId: {
        type: Sequelize.INTEGER,
        references: { model: 'vendors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      amount: { type: Sequelize.DECIMAL(15, 2), allowNull: false },
      fee: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
      status: { type: Sequelize.ENUM('pending', 'processing', 'completed', 'failed'), defaultValue: 'pending' },
      paymentMethod: { type: Sequelize.STRING(50), allowNull: true },
      paymentRef: { type: Sequelize.STRING(200), allowNull: true },
      paidAt: { type: Sequelize.DATE, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Tax Rates
    await queryInterface.createTable('tax_rates', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      countryCode: { type: Sequelize.STRING(2), allowNull: false },
      region: { type: Sequelize.STRING(100), allowNull: true },
      rate: { type: Sequelize.DECIMAL(5, 2), allowNull: false },
      name: { type: Sequelize.STRING(100), allowNull: false },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Currencies
    await queryInterface.createTable('currencies', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      code: { type: Sequelize.STRING(3), unique: true, allowNull: false },
      name: { type: Sequelize.STRING(50), allowNull: false },
      symbol: { type: Sequelize.STRING(10), allowNull: false },
      exchangeRate: { type: Sequelize.DECIMAL(15, 6), allowNull: false },
      isBase: { type: Sequelize.BOOLEAN, defaultValue: false },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Sales Summaries
    await queryInterface.createTable('sales_summaries', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      period: { type: Sequelize.STRING(7), unique: true, allowNull: false },
      totalRevenue: { type: Sequelize.DECIMAL(15, 2), defaultValue: 0 },
      totalOrders: { type: Sequelize.INTEGER, defaultValue: 0 },
      totalProducts: { type: Sequelize.INTEGER, defaultValue: 0 },
      avgOrderValue: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Loyalty Points
    await queryInterface.createTable('loyalty_points', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      points: { type: Sequelize.INTEGER, defaultValue: 0 },
      balance: { type: Sequelize.INTEGER, defaultValue: 0 },
      reason: { type: Sequelize.STRING(100), allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.addIndex('loyalty_points', ['userId'], { unique: true });

    // Referrals
    await queryInterface.createTable('referrals', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      referrerId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      refereeId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: { type: Sequelize.STRING(20), defaultValue: 'pending' },
      rewardPoints: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    const tables = [
      'referrals', 'loyalty_points', 'sales_summaries', 'currencies', 'tax_rates',
      'payouts', 'commission_plans', 'disputes', 'vendor_messages', 'vendor_products',
      'vendors', 'recently_viewed', 'promotions', 'notifications', 'reviews',
      'wishlist_items', 'order_status_history', 'order_items', 'orders', 'cart_items',
      'product_specifications', 'product_images', 'products', 'categories', 'users',
    ];
    for (const table of tables) {
      await queryInterface.dropTable(table);
    }
  },
};
