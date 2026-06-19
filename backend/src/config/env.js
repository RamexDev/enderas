/**
 * Environment configuration loader and validator.
 * Loads .env, validates required variables, and exports typed config object.
 * Exits process on missing required vars or invalid production config.
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/** Variables that must be set for the server to start */
const requiredVars = [
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_USER',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
];

const missing = requiredVars.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const isTest = nodeEnv === 'test';

const WEAK_JWT_SECRETS = new Set([
  'change-this-in-production',
  'change-this-in-production-too',
  'secret',
  'jwt-secret',
  'your-secret-key',
]);

const MIN_JWT_SECRET_LENGTH = 32;

/** Parse a comma-separated list of browser origins (trims whitespace, drops empties). */
function parseOrigins(value, fallback = '') {
  const raw = value || fallback;
  if (!raw) return [];
  return raw
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean);
}

const defaultAdminOrigins = 'http://localhost:5173,http://127.0.0.1:5173';
const defaultFrontendOrigins = 'http://localhost:5174,http://127.0.0.1:5174';

// Legacy CLIENT_URLS: first origin → admin, remaining → frontend
const legacyClientUrls = parseOrigins(process.env.CLIENT_URLS);
const legacyAdminFallback = legacyClientUrls[0] || process.env.CLIENT_URL;
const legacyFrontendFallback = legacyClientUrls.length > 1
  ? legacyClientUrls.slice(1).join(',')
  : undefined;

const adminUrls = parseOrigins(
  process.env.ADMIN_URL,
  legacyAdminFallback || defaultAdminOrigins,
);
const frontendUrls = parseOrigins(
  process.env.FRONTEND_URL,
  legacyFrontendFallback || defaultFrontendOrigins,
);
const mediaUrls = [...new Set([...adminUrls, ...frontendUrls])];

const uploadPathRaw = process.env.UPLOAD_PATH || './src/uploads';
const uploadResolvedPath = path.isAbsolute(uploadPathRaw)
  ? uploadPathRaw
  : path.resolve(__dirname, '../../', uploadPathRaw);

function validateJwtSecret(name, value) {
  if (!value || value.length < MIN_JWT_SECRET_LENGTH) {
    return `${name} must be at least ${MIN_JWT_SECRET_LENGTH} characters`;
  }
  if (WEAK_JWT_SECRETS.has(value.toLowerCase())) {
    return `${name} must not use a placeholder or weak default value`;
  }
  return null;
}

function hasLocalhostOrigin(urls) {
  return urls.some((origin) => {
    try {
      const hostname = new URL(origin).hostname;
      return hostname === 'localhost' || hostname === '127.0.0.1';
    } catch {
      return false;
    }
  });
}

function failValidation(message) {
  console.error(message);
  process.exit(1);
}

if (!isTest) {
  const jwtSecretError = validateJwtSecret('JWT_SECRET', process.env.JWT_SECRET);
  if (jwtSecretError) failValidation(jwtSecretError);

  const refreshSecretError = validateJwtSecret('JWT_REFRESH_SECRET', process.env.JWT_REFRESH_SECRET);
  if (refreshSecretError) failValidation(refreshSecretError);

  if (process.env.JWT_SECRET === process.env.JWT_REFRESH_SECRET) {
    failValidation('JWT_SECRET and JWT_REFRESH_SECRET must be different');
  }
}

if (isProd) {
  if (!process.env.SUPER_ADMIN_PASSWORD) {
    failValidation('SUPER_ADMIN_PASSWORD is required when NODE_ENV=production');
  }

  if (!process.env.DB_PASSWORD) {
    failValidation('DB_PASSWORD is required when NODE_ENV=production');
  }

  const hasExplicitAdminOrigins = Boolean(process.env.ADMIN_URL || legacyAdminFallback);
  const hasExplicitFrontendOrigins = Boolean(process.env.FRONTEND_URL || legacyFrontendFallback);

  if (!hasExplicitAdminOrigins) {
    failValidation('ADMIN_URL (or CLIENT_URLS) is required when NODE_ENV=production');
  }

  if (!hasExplicitFrontendOrigins) {
    failValidation('FRONTEND_URL (or CLIENT_URLS) is required when NODE_ENV=production');
  }

  if (hasLocalhostOrigin(adminUrls) || hasLocalhostOrigin(frontendUrls)) {
    failValidation('Production CORS origins must not include localhost or 127.0.0.1');
  }
}

const env = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv,
  isDev: nodeEnv === 'development',
  isTest: nodeEnv === 'test',
  isStaging: nodeEnv === 'staging',
  isProd,
  logLevel: process.env.LOG_LEVEL || (nodeEnv === 'production' ? 'info' : 'debug'),

  /** Masked representation of sensitive config for startup logging */
  get mask() {
    return {
      port: this.port,
      nodeEnv: this.nodeEnv,
      logLevel: this.logLevel,
      db: { host: this.db.host, port: this.db.port, name: this.db.name, user: this.db.user },
      jwt: { accessExpiresIn: this.jwt.accessExpiresIn, refreshExpiresIn: this.jwt.refreshExpiresIn },
      adminUrl: this.adminUrl,
      frontendUrl: this.frontendUrl,
      apiBaseUrl: this.apiBaseUrl,
      upload: { path: this.upload.path, maxFileSize: this.upload.maxFileSize },
    };
  },

  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  /** Primary admin CMS origin (first entry when ADMIN_URL is comma-separated) */
  adminUrl: adminUrls[0],
  /** Allowed origins for admin/auth/management API routes */
  adminUrls,
  /** Primary public website origin (first entry when FRONTEND_URL is comma-separated) */
  frontendUrl: frontendUrls[0],
  /** Allowed origins for /api/v1/public routes */
  frontendUrls,
  /** Allowed origins for /uploads static media */
  mediaUrls,
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:5000/api/v1',

  upload: {
    path: uploadPathRaw,
    resolvedPath: uploadResolvedPath,
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024,
  },

  superAdmin: {
    email: process.env.SUPER_ADMIN_EMAIL || 'admin@enderas.com',
    password: process.env.SUPER_ADMIN_PASSWORD || '',
  },

  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || '',
    adminEmail: process.env.ADMIN_EMAIL || '',
  },

  webhook: {
    url: process.env.NOTIFICATION_WEBHOOK_URL || '',
  },
};

export default env;
