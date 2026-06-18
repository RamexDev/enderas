import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import { validatePasswordStrength } from '../utils/password.js';

const SALT_ROUNDS = 12;

export async function listUsers() {
  return User.findAll({
    attributes: { exclude: ['password'] },
    order: [['created_at', 'DESC']],
  });
}

export async function getUserById(id) {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  return user;
}

export async function createUser(data) {
  const validation = validatePasswordStrength(data.password);
  if (!validation.valid) {
    throw Object.assign(new Error(validation.message), { statusCode: 400 });
  }

  const existing = await User.findOne({ where: { email: data.email } });
  if (existing) {
    throw Object.assign(new Error('Email already in use'), { statusCode: 409 });
  }

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role,
    is_active: data.is_active !== undefined ? data.is_active : true,
  });

  const result = user.toJSON();
  delete result.password;
  return result;
}

export async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });

  if (data.email && data.email !== user.email) {
    const existing = await User.findOne({ where: { email: data.email } });
    if (existing) throw Object.assign(new Error('Email already in use'), { statusCode: 409 });
  }

  await user.update({
    name: data.name,
    email: data.email,
    role: data.role,
  });

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
