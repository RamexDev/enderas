const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const SALT_ROUNDS = 12;
const MIN_LENGTH = 12;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}\[\]|:;"'<>,.?/~`]).{12,}$/;

function generateStrongPassword(length = 32) {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
}

function validatePasswordStrength(password) {
  if (!password || password.length < MIN_LENGTH) {
    return { valid: false, message: `Password must be at least ${MIN_LENGTH} characters` };
  }
  if (!PASSWORD_REGEX.test(password)) {
    return { valid: false, message: 'Password must contain uppercase, lowercase, number, and special character' };
  }
  return { valid: true };
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const email = process.env.SUPER_ADMIN_EMAIL || 'admin@enderas.com';
    let password = process.env.SUPER_ADMIN_PASSWORD || '';
    const nodeEnv = process.env.NODE_ENV || 'development';

    const existing = await queryInterface.rawSelect('users', {
      where: { email },
    }, ['id']);

    if (existing) {
      console.log(`Super Admin with email "${email}" already exists. Skipping.`);
      return;
    }

    if (nodeEnv === 'production') {
      if (!password) {
        throw new Error(
          'SUPER_ADMIN_PASSWORD must be provided in production. Set it in your .env file.'
        );
      }
      const validation = validatePasswordStrength(password);
      if (!validation.valid) {
        throw new Error(`Weak password: ${validation.message}`);
      }
    } else if (nodeEnv === 'staging') {
      if (!password) {
        throw new Error(
          'SUPER_ADMIN_PASSWORD must be provided in staging. Set it in your .env file.'
        );
      }
      const validation = validatePasswordStrength(password);
      if (!validation.valid) {
        throw new Error(`Weak password: ${validation.message}`);
      }
    } else {
      if (!password) {
        password = generateStrongPassword(24);
        console.log('══════════════════════════════════════════════');
        console.log('  SUPER ADMIN CREDENTIALS (development only)');
        console.log('  Email:    ' + email);
        console.log('  Password: ' + password);
        console.log('══════════════════════════════════════════════');
      }
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await queryInterface.bulkInsert('users', [{
      name: 'Super Admin',
      email,
      password: hashedPassword,
      role: 'super_admin',
      is_active: true,
      must_change_password: true,
      created_at: new Date(),
      updated_at: new Date(),
    }]);

    console.log(`Super Admin created: ${email}`);
  },

  async down(queryInterface, Sequelize) {
    const email = process.env.SUPER_ADMIN_EMAIL || 'admin@enderas.com';
    await queryInterface.bulkDelete('users', { email }, {});
  },
};
