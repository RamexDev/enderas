import { describe, it, expect, vi, beforeEach } from 'vitest';
import logger from '../../src/utils/logger.js';

describe('logger — interface', () => {
  it('exports debug, info, warn, error functions', () => {
    expect(typeof logger.debug).toBe('function');
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.error).toBe('function');
  });

  it('exports child method', () => {
    expect(typeof logger.child).toBe('function');
  });
});

describe('logger.child', () => {
  it('returns an object with the same four log methods', () => {
    const child = logger.child({ module: 'test' });
    expect(typeof child.debug).toBe('function');
    expect(typeof child.info).toBe('function');
    expect(typeof child.warn).toBe('function');
    expect(typeof child.error).toBe('function');
  });
});

describe('logger — error handling', () => {
  it('accepts Error objects without throwing', () => {
    expect(() => logger.error('test error', { error: new Error('boom') })).not.toThrow();
  });

  it('accepts null/undefined meta without throwing', () => {
    expect(() => logger.info('no meta', null)).not.toThrow();
    expect(() => logger.info('no meta', undefined)).not.toThrow();
  });

  it('accepts string-only message without meta', () => {
    expect(() => logger.info('just a message')).not.toThrow();
  });
});
