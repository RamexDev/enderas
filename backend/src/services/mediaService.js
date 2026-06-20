import fs from 'fs/promises';
import path from 'path';
import sequelize from '../config/database.js';
import { Media } from '../models/index.js';
import { AppError } from '../utils/AppError.js';
import logger from '../utils/logger.js';

export async function listMedia(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  const { count, rows } = await Media.findAndCountAll({
    include: [{ association: 'uploader', attributes: ['id', 'name'] }],
    order: [['created_at', 'DESC']],
    offset,
    limit,
  });
  return { data: rows, total: count, page, limit };
}

export async function deleteMedia(id) {
  const record = await Media.findByPk(id);
  if (!record) throw new AppError(`Media with ID ${id} not found`, 404);

  const t = await sequelize.transaction();

  try {
    await record.destroy({ transaction: t });
    await fs.unlink(record.path).catch((fileErr) => {
      logger.warn('Failed to delete media file from disk', { path: record.path, error: fileErr.message });
    });
    await t.commit();
    return { message: 'Media deleted' };
  } catch (error) {
    await t.rollback();
    throw error;
  }
}
