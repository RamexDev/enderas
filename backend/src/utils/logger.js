import { inspect } from 'util';
import env from '../config/env.js';

const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };
const CURRENT_LEVEL = LOG_LEVELS[env.logLevel] ?? LOG_LEVELS.info;

function timestamp() {
  return new Date().toISOString();
}

function formatValue(v) {
  if (v instanceof Error) {
    return `${v.stack || v.message}`;
  }
  if (typeof v === 'object' && v !== null) {
    return inspect(v, { colors: false, depth: 3, breakLength: Infinity });
  }
  return String(v);
}

function extractRequestMeta(meta) {
  if (!meta || !meta.req) return '';
  const req = meta.req;
  const reqId = req.requestId || '-';
  const ip = req.ip || req.connection?.remoteAddress || '-';
  const method = req.method || '-';
  const url = req.originalUrl || req.url || '-';
  return `[${reqId}] ${ip} ${method} ${url}`;
}

function log(level, message, meta) {
  if (LOG_LEVELS[level] < CURRENT_LEVEL) return;

  const reqPrefix = extractRequestMeta(meta);
  const metaStr = meta
    ? ' ' + Object.entries(meta)
        .filter(([k]) => k !== 'req')
        .map(([k, v]) => `${k}=${formatValue(v)}`)
        .join(' ')
    : '';

  if (env.isDev) {
    const label = level.toUpperCase().padEnd(5);
    const msg = metaStr ? `${message}${metaStr}` : message;
    if (reqPrefix) {
      console.error(`${timestamp()} ${label} ${reqPrefix} ${msg}`);
    } else {
      console.error(`${timestamp()} ${label} ${msg}`);
    }
  } else {
    const entry = JSON.stringify({
      level,
      time: timestamp(),
      message,
      requestId: meta?.req?.requestId || undefined,
      ...(meta
        ? Object.fromEntries(
            Object.entries(meta).filter(([k]) => k !== 'req'),
          )
        : {}),
    });
    console.error(entry);
  }
}

export const logger = {
  debug: (message, meta) => log('debug', message, meta),
  info: (message, meta) => log('info', message, meta),
  warn: (message, meta) => log('warn', message, meta),
  error: (message, meta) => log('error', message, meta),

  child: (defaultMeta) => {
    const child = {};
    for (const lvl of ['debug', 'info', 'warn', 'error']) {
      child[lvl] = (message, meta) =>
        log(lvl, message, { ...defaultMeta, ...meta });
    }
    return child;
  },
};

export default logger;
