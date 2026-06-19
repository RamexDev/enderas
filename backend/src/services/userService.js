import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import { validatePasswordStrength } from '../utils/password.js';
import { pickFields } from '../utils/pickFields.js';
import { USER_CREATE_FIELDS, USER_UPDATE_FIELDS } from '../constants/fieldAllowlists.js';

const SALT_ROUNDS = 12;

export async function listUsers(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  const { count, rows } = await User.findAndCountAll({
    attributes: { exclude: ['password'] },
    order: [['created_at', 'DESC']],
    offset,
    limit,
  });
  return { data: rows, total: count, page, limit };
}

export async function getUserById(id) {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  return user;
}

export async function createUser(data) {
  const safe = pickFields(data, USER_CREATE_FIELDS);

  const validation = validatePasswordStrength(data.password);
  if (!validation.valid) {
    throw Object.assign(new Error(validation.message), { statusCode: 400 });
  }

  const existing = await User.findOne({ where: { email: safe.email } });
  if (existing) {
    throw Object.assign(new Error('Email already in use'), { statusCode: 409 });
  }

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await User.create({
    name: safe.name,
    email: safe.email,
    password: hashedPassword,
    role: safe.role,
    is_active: safe.is_active !== undefined ? safe.is_active : true,
  });

  const result = user.toJSON();
  delete result.password;
  return result;
}

export async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });

  const safe = pickFields(data, USER_UPDATE_FIELDS);

  if (safe.email && safe.email !== user.email) {
    const existing = await User.findOne({ where: { email: safe.email } });
    if (existing) throw Object.assign(new Error('Email already in use'), { statusCode: 409 });
  }

  await user.update(safe);

  const result = user.toJSON();
  delete result.password;
  return result;
}

export async function toggleUserStatus(id) {
  const user = await User.findByPk(id);
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  await user.update({ is_active: !user.is_active });

  const result = user.toJSON();
  delete result.password;
  return result;
}

export async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  await user.destroy();
  return { message: 'User deleted' };
}
