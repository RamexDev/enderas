import { describe, it, expect, vi } from 'vitest';
import { requestId } from '../../src/middleware/requestId.js';

describe('requestId middleware', () => {
  function mockReqRes() {
    const req = {};
    const res = { setHeader: vi.fn() };
    const next = vi.fn();
    return { req, res, next };
  }

  it('attaches a UUID string to req.requestId', () => {
    const { req, res, next } = mockReqRes();
    requestId(req, res, next);

    expect(req.requestId).toBeDefined();
    expect(typeof req.requestId).toBe('string');
    expect(req.requestId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    );
  });

  it('sets X-Request-Id response header', () => {
    const { req, res, next } = mockReqRes();
    requestId(req, res, next);

    expect(res.setHeader).toHaveBeenCalledWith('X-Request-Id', req.requestId);
  });

  it('generates a unique ID on each call', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      const { req, res, next } = mockReqRes();
      requestId(req, res, next);
      ids.add(req.requestId);
    }
    expect(ids.size).toBe(100);
  });

  it('calls next()', () => {
    const { req, res, next } = mockReqRes();
    requestId(req, res, next);
    expect(next).toHaveBeenCalledOnce();
  });
});
