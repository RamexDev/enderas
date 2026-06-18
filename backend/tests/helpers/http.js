/**
 * Shared HTTP mocks for controller contract tests.
 */

import { vi } from 'vitest';

/** Minimal Express request stub */
export function createMockReq(overrides = {}) {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    user: null,
    ...overrides,
  };
}

/** Express response stub that captures status + JSON body */
export function createMockRes() {
  const res = {
    statusCode: 200,
    body: null,
  };
  res.status = vi.fn((code) => {
    res.statusCode = code;
    return res;
  });
  res.json = vi.fn((payload) => {
    res.body = payload;
    return res;
  });
  return res;
}

/** Express next stub; records thrown/passed errors */
export function createMockNext() {
  const next = vi.fn();
  return next;
}

/** Read captured response from a mock res */
export function getCapturedResponse(res) {
  return { statusCode: res.statusCode, body: res.body };
}

/**
 * Assert a service-layer error follows the { message, statusCode } contract.
 * @param {Function} fn - Async function expected to throw
 * @param {{ message: string|RegExp, statusCode: number }} expected
 */
export async function expectServiceError(fn, expected) {
  let caught;
  try {
    await fn();
  } catch (error) {
    caught = error;
  }

  expect(caught).toBeDefined();
  expect(caught).toBeInstanceOf(Error);
  expect(caught.statusCode).toBe(expected.statusCode);

  if (expected.message !== undefined) {
    if (expected.message instanceof RegExp) {
      expect(caught.message).toMatch(expected.message);
    } else {
      expect(caught.message).toBe(expected.message);
    }
  }

  return caught;
}
