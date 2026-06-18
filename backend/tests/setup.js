/**
 * Vitest global setup — forces test environment and in-memory SQLite database.
 */
process.env.NODE_ENV = 'test';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';
process.env.DB_NAME = 'enderas_test';
process.env.DB_USER = 'root';
process.env.DB_PASSWORD = '';
process.env.JWT_SECRET = 'test-jwt-secret-key-32chars-min';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key-32chars';
process.env.JWT_ACCESS_EXPIRES_IN = '15m';
process.env.JWT_REFRESH_EXPIRES_IN = '7d';
process.env.ADMIN_URL = 'http://localhost:5173';
process.env.FRONTEND_URL = 'http://localhost:5174';
process.env.SUPER_ADMIN_EMAIL = 'admin@test.com';
process.env.SUPER_ADMIN_PASSWORD = 'TestAdmin123!@#';
