/**
 * Service ↔ controller contract tests.
 * Verifies service error shape and controller HTTP mapping stay aligned.
 */

import { describe, it, expect, beforeAll, vi } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import * as serviceService from '../../src/services/serviceService.js';
import * as serviceController from '../../src/controllers/admin/serviceController.js';
import { Service } from '../../src/models/index.js';
import { setupTestDb } from '../helpers/db.js';
import {
  createMockReq,
  createMockRes,
  createMockNext,
  getCapturedResponse,
  expectServiceError,
} from '../helpers/http.js';

describe('service layer ↔ controller contract', () => {
  beforeAll(async () => {
    await setupTestDb();
    await Service.create({ title: 'Existing', slug: 'existing', is_active: true });
  });

  describe('serviceService error contract', () => {
    it('getServiceById throws { message, statusCode: 404 } for missing id', async () => {
      await expectServiceError(
        () => serviceService.getServiceById(uuidv4()),
        { message: /Service with ID .* not found/, statusCode: 404 },
      );
    });

    it('updateService throws { message, statusCode: 404 } for missing id', async () => {
      await expectServiceError(
        () => serviceService.updateService(uuidv4(), { title: 'Nope' }),
        { message: /Service with ID .* not found/, statusCode: 404 },
      );
    });

    it('deleteService throws { message, statusCode: 404 } for missing id', async () => {
      await expectServiceError(
        () => serviceService.deleteService(uuidv4()),
        { message: /Service with ID .* not found/, statusCode: 404 },
      );
    });

    it('getServiceBySlug throws { message, statusCode: 404 } for inactive/missing slug', async () => {
      await expectServiceError(
        () => serviceService.getServiceBySlug('does-not-exist'),
        { message: 'Service not found', statusCode: 404 },
      );
    });
  });

  describe('serviceController HTTP mapping', () => {
    it('show → 404 when service not found', async () => {
      const req = createMockReq({ params: { id: uuidv4() } });
      const res = createMockRes();
      const next = createMockNext();

      await serviceController.show(req, res, next);

      const { statusCode, body } = getCapturedResponse(res);
      expect(statusCode).toBe(404);
      expect(body.success).toBe(false);
      expect(body.message).toMatch(/Service with ID .* not found/);
      expect(next).not.toHaveBeenCalled();
    });

    it('destroy → 404 when service not found', async () => {
      const req = createMockReq({ params: { id: uuidv4() } });
      const res = createMockRes();
      const next = createMockNext();

      await serviceController.destroy(req, res, next);

      expect(getCapturedResponse(res).statusCode).toBe(404);
      expect(getCapturedResponse(res).body.message).toMatch(/Service with ID .* not found/);
    });

    it('toggleStatus → 404 when service not found', async () => {
      const req = createMockReq({ params: { id: uuidv4() } });
      const res = createMockRes();
      const next = createMockNext();

      await serviceController.toggleStatus(req, res, next);

      expect(getCapturedResponse(res).statusCode).toBe(404);
    });

    it('create → 201 on success (no statusCode on service result)', async () => {
      const req = createMockReq({
        body: { title: 'Contract Test Service', short_description: 'desc' },
      });
      const res = createMockRes();
      const next = createMockNext();

      await serviceController.create(req, res, next);

      const { statusCode, body } = getCapturedResponse(res);
      expect(statusCode).toBe(201);
      expect(body.success).toBe(true);
      expect(body.data.slug).toBe('contract-test-service');
      expect(next).not.toHaveBeenCalled();
    });

    it('passes unexpected errors to next()', async () => {
      vi.spyOn(serviceService, 'getServiceById').mockRejectedValue(new Error('DB exploded'));

      const req = createMockReq({ params: { id: uuidv4() } });
      const res = createMockRes();
      const next = createMockNext();

      await serviceController.show(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: 'DB exploded' }));
      vi.restoreAllMocks();
    });
  });
});
