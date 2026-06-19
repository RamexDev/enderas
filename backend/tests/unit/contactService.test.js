import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppError } from '../../src/utils/AppError.js';

const mockCreate = vi.fn();
const mockFindOne = vi.fn();
const mockFindByPk = vi.fn();
const mockFindAndCountAll = vi.fn();
const mockUpdate = vi.fn();
const mockDestroy = vi.fn();
const mockContactMessage = {
  id: 1,
  name: 'John',
  email: 'john@test.com',
  phone: null,
  subject: 'Hello',
  message: 'Hi there',
  is_read: false,
  is_archived: false,
  update: mockUpdate,
  destroy: mockDestroy,
};

vi.mock('../../src/models/index.js', () => ({
  ContactPage: {
    findOne: mockFindOne,
    create: vi.fn((data) => Promise.resolve({ id: data?.id || 'uuid', update: vi.fn() })),
  },
  ContactMessage: {
    create: mockCreate,
    findByPk: mockFindByPk,
    findAndCountAll: mockFindAndCountAll,
  },
}));

vi.mock('../../src/utils/logger.js', () => ({
  default: { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn() },
}));

vi.mock('../../src/services/notificationService.js', () => ({
  notifyNewMessage: vi.fn(),
}));

const {
  submitContactMessage,
  listContactMessages,
  getContactMessage,
  markMessageRead,
  archiveMessage,
  markMessageUnread,
  unarchiveMessage,
  deleteMessage,
  getContactPage,
} = await import('../../src/services/contactService.js');

describe('contactService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('submitContactMessage', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Inquiry',
      message: 'Hello, I would like more information.',
    };

    it('creates a contact message with sanitized fields', async () => {
      mockCreate.mockResolvedValue(mockContactMessage);
      const result = await submitContactMessage(validData);
      expect(mockCreate).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        phone: null,
        subject: 'Inquiry',
        message: 'Hello, I would like more information.',
      });
      expect(result).toEqual(mockContactMessage);
    });

    it('strips HTML tags from name, subject, and message', async () => {
      const data = {
        ...validData,
        name: '<script>alert("xss")</script>John',
        subject: '<b>Inquiry</b>',
        message: '<p>Hello</p><script>evil()</script>',
      };
      mockCreate.mockResolvedValue(mockContactMessage);
      await submitContactMessage(data);
      expect(mockCreate).toHaveBeenCalledWith({
        name: 'alert("xss")John',
        email: 'john@example.com',
        phone: null,
        subject: 'Inquiry',
        message: 'Helloevil()',
      });
    });

    it('includes phone when provided', async () => {
      const data = { ...validData, phone: '+1-555-1234' };
      mockCreate.mockResolvedValue(mockContactMessage);
      await submitContactMessage(data);
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({ phone: '+1-555-1234' })
      );
    });

    it('sets phone to null when not provided', async () => {
      mockCreate.mockResolvedValue(mockContactMessage);
      await submitContactMessage(validData);
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({ phone: null })
      );
    });
  });

  describe('listContactMessages', () => {
    it('returns paginated results filtered by archived status', async () => {
      const rows = [mockContactMessage];
      mockFindAndCountAll.mockResolvedValue({ count: 1, rows });
      const result = await listContactMessages(1, 10, false);
      expect(mockFindAndCountAll).toHaveBeenCalledWith({
        where: { is_archived: false },
        order: [['created_at', 'DESC']],
        offset: 0,
        limit: 10,
      });
      expect(result).toEqual({ data: rows, total: 1, page: 1, limit: 10 });
    });

    it('applies pagination offset correctly', async () => {
      mockFindAndCountAll.mockResolvedValue({ count: 0, rows: [] });
      await listContactMessages(3, 20, true);
      expect(mockFindAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({ offset: 40, limit: 20 })
      );
    });
  });

  describe('getContactMessage', () => {
    it('returns message when found', async () => {
      mockFindByPk.mockResolvedValue(mockContactMessage);
      const result = await getContactMessage(1);
      expect(result).toEqual(mockContactMessage);
    });

    it('throws AppError with 404 when not found', async () => {
      mockFindByPk.mockResolvedValue(null);
      await expect(getContactMessage(999)).rejects.toThrow(AppError);
      await expect(getContactMessage(999)).rejects.toThrow('Message not found');
      try {
        await getContactMessage(999);
      } catch (error) {
        expect(error.statusCode).toBe(404);
      }
    });
  });

  describe('markMessageRead', () => {
    it('marks message as read', async () => {
      const msg = { ...mockContactMessage, is_read: false, update: mockUpdate };
      mockFindByPk.mockResolvedValue(msg);
      mockUpdate.mockResolvedValue({ ...msg, is_read: true });
      await markMessageRead(1);
      expect(mockUpdate).toHaveBeenCalledWith({ is_read: true });
    });

    it('throws AppError with 404 when not found', async () => {
      mockFindByPk.mockResolvedValue(null);
      await expect(markMessageRead(999)).rejects.toThrow(AppError);
      await expect(markMessageRead(999)).rejects.toThrow('Message not found');
    });
  });

  describe('archiveMessage', () => {
    it('marks message as archived', async () => {
      const msg = { ...mockContactMessage, is_archived: false, update: mockUpdate };
      mockFindByPk.mockResolvedValue(msg);
      mockUpdate.mockResolvedValue({ ...msg, is_archived: true });
      await archiveMessage(1);
      expect(mockUpdate).toHaveBeenCalledWith({ is_archived: true });
    });

    it('throws AppError with 404 when not found', async () => {
      mockFindByPk.mockResolvedValue(null);
      await expect(archiveMessage(999)).rejects.toThrow(AppError);
      await expect(archiveMessage(999)).rejects.toThrow('Message not found');
    });
  });

  describe('getContactPage', () => {
    it('returns existing contact page', async () => {
      const page = { id: 'abc-123', email: 'admin@site.com' };
      mockFindOne.mockResolvedValue(page);
      const result = await getContactPage();
      expect(result).toEqual(page);
    });
  });

  describe('markMessageUnread', () => {
    it('marks message as unread', async () => {
      const msg = { ...mockContactMessage, is_read: true, update: mockUpdate };
      mockFindByPk.mockResolvedValue(msg);
      mockUpdate.mockResolvedValue({ ...msg, is_read: false });
      await markMessageUnread(1);
      expect(mockUpdate).toHaveBeenCalledWith({ is_read: false });
    });

    it('throws AppError with 404 when not found', async () => {
      mockFindByPk.mockResolvedValue(null);
      await expect(markMessageUnread(999)).rejects.toThrow(AppError);
      await expect(markMessageUnread(999)).rejects.toThrow('Message not found');
    });
  });

  describe('unarchiveMessage', () => {
    it('marks message as unarchived', async () => {
      const msg = { ...mockContactMessage, is_archived: true, update: mockUpdate };
      mockFindByPk.mockResolvedValue(msg);
      mockUpdate.mockResolvedValue({ ...msg, is_archived: false });
      await unarchiveMessage(1);
      expect(mockUpdate).toHaveBeenCalledWith({ is_archived: false });
    });

    it('throws AppError with 404 when not found', async () => {
      mockFindByPk.mockResolvedValue(null);
      await expect(unarchiveMessage(999)).rejects.toThrow(AppError);
      await expect(unarchiveMessage(999)).rejects.toThrow('Message not found');
    });
  });

  describe('deleteMessage', () => {
    it('deletes the message', async () => {
      mockFindByPk.mockResolvedValue(mockContactMessage);
      mockDestroy.mockResolvedValue(undefined);
      const result = await deleteMessage(1);
      expect(mockDestroy).toHaveBeenCalledOnce();
      expect(result).toEqual({ id: 1 });
    });

    it('throws AppError with 404 when not found', async () => {
      mockFindByPk.mockResolvedValue(null);
      await expect(deleteMessage(999)).rejects.toThrow(AppError);
      await expect(deleteMessage(999)).rejects.toThrow('Message not found');
    });
  });
});
