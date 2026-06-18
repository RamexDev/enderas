/**
 * Multer file upload configuration.
 * Stores images in src/uploads/{entity_type}/ with UUID filenames.
 * Allowed types: JPEG, PNG, WEBP. Max size from MAX_FILE_SIZE env var.
 */

import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import env from '../config/env.js';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let subDir = 'general';
    if (req.body.entity_type) {
      subDir = req.body.entity_type;
    } else if (req.params.entityType) {
      subDir = req.params.entityType;
    }

    const uploadPath = path.resolve(env.upload.path, subDir);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
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
