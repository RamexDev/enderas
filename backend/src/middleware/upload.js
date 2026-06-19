/**
 * Multer file upload configuration.
 * Stores images in {UPLOAD_PATH}/{entity_type}/ with UUID filenames.
 * Allowed types: JPEG, PNG, WEBP. Max size from MAX_FILE_SIZE env var.
 */

import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import env from '../config/env.js';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const ALLOWED_ENTITY_TYPES = new Set([
  'general',
  'services',
  'gallery',
  'team',
  'blog',
  'posts',
  'hero-slides',
  'partners',
  'testimonials',
  'settings',
  'about',
]);

/**
 * Resolve a safe upload subdirectory within the configured upload root.
 * @throws {Error} When entity_type is invalid or path escapes the upload root
 */
export function resolveUploadDir(entityType) {
  const root = env.upload.resolvedPath;
  const subDir = entityType || 'general';

  if (!ALLOWED_ENTITY_TYPES.has(subDir)) {
    throw Object.assign(new Error(`Invalid entity_type: ${subDir}`), { statusCode: 400 });
  }

  const uploadPath = path.resolve(root, subDir);
  const rootWithSep = root.endsWith(path.sep) ? root : `${root}${path.sep}`;

  if (uploadPath !== root && !uploadPath.startsWith(rootWithSep)) {
    throw Object.assign(new Error('Invalid upload path'), { statusCode: 400 });
  }

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return uploadPath;
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    try {
      let subDir = 'general';
      if (req.body.entity_type) {
        subDir = req.body.entity_type;
      } else if (req.params.entityType) {
        subDir = req.params.entityType;
      }

      const uploadPath = resolveUploadDir(subDir);
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv4()}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}. Allowed: JPG, JPEG, PNG, WEBP`), false);
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: env.upload.maxFileSize },
});
