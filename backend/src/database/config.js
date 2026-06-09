require('dotenv').config({ path: require('path').resolve(__dirname, '..', '..', '..', '.env') });

module.exports = {
  development: {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER || 'ecommerce',
    password: process.env.DB_PASSWORD || 'ecommerce',
    database: process.env.DB_NAME || 'ecommerce',
  },
};
