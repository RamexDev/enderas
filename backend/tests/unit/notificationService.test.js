import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSendMail = vi.fn();
vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({ sendMail: mockSendMail })),
  },
}));

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

const testMessage = {
  id: 1,
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+1-555-6789',
  subject: 'Support Request',
  message: 'Need help.',
  createdAt: new Date().toISOString(),
};

describe('notificationService', () => {
  let env;

  beforeEach(async () => {
    vi.clearAllMocks();
    env = (await import('../../src/config/env.js')).default;
    env.smtp = { host: '', port: 587, user: '', pass: '', from: '', adminEmail: '' };
    env.webhook = { url: '' };
  });

  describe('notifyNewMessage', () => {
    it('skips email when SMTP is not configured', async () => {
      const { notifyNewMessage } = await import('../../src/services/notificationService.js');
      await notifyNewMessage(testMessage);
      expect(mockSendMail).not.toHaveBeenCalled();
    });

    it('skips webhook when URL is not configured', async () => {
      const { notifyNewMessage } = await import('../../src/services/notificationService.js');
      await notifyNewMessage(testMessage);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('sends email when SMTP is configured', async () => {
      env.smtp = { host: 'smtp.test.com', port: 587, user: 'user', pass: 'pass', from: 'from@test.com', adminEmail: 'admin@test.com' };
      mockSendMail.mockResolvedValue({ accepted: ['admin@test.com'] });
      const { notifyNewMessage } = await import('../../src/services/notificationService.js');
      await notifyNewMessage(testMessage);
      expect(mockSendMail).toHaveBeenCalledOnce();
      expect(mockSendMail.mock.calls[0][0].to).toBe('admin@test.com');
      expect(mockSendMail.mock.calls[0][0].subject).toContain('Support Request');
    });

    it('sends webhook when URL is configured', async () => {
      env.webhook = { url: 'https://hooks.test.com/notify' };
      mockFetch.mockResolvedValue({ ok: true });
      const { notifyNewMessage } = await import('../../src/services/notificationService.js');
      await notifyNewMessage(testMessage);
      expect(mockFetch).toHaveBeenCalledOnce();
      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[0]).toBe('https://hooks.test.com/notify');
      expect(callArgs[1].method).toBe('POST');
      const body = JSON.parse(callArgs[1].body);
      expect(body.event).toBe('contact_message.created');
      expect(body.data.id).toBe(1);
    });

    it('does not fail when email send throws', async () => {
      env.smtp = { host: 'smtp.test.com', port: 587, user: 'user', pass: 'pass', from: 'from@test.com', adminEmail: 'admin@test.com' };
      mockSendMail.mockRejectedValue(new Error('Connection refused'));
      const { notifyNewMessage } = await import('../../src/services/notificationService.js');
      await expect(notifyNewMessage(testMessage)).resolves.toBeUndefined();
    });

    it('does not fail when webhook throws', async () => {
      env.webhook = { url: 'https://hooks.test.com/notify' };
      mockFetch.mockRejectedValue(new Error('Network error'));
      const { notifyNewMessage } = await import('../../src/services/notificationService.js');
      await expect(notifyNewMessage(testMessage)).resolves.toBeUndefined();
    });

    it('logs warning when webhook returns non-ok status', async () => {
      env.webhook = { url: 'https://hooks.test.com/notify' };
      mockFetch.mockResolvedValue({ ok: false, status: 500 });
      const { notifyNewMessage } = await import('../../src/services/notificationService.js');
      await notifyNewMessage(testMessage);
      expect(mockFetch).toHaveBeenCalledOnce();
    });
  });
});
