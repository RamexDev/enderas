import nodemailer from 'nodemailer';
import env from '../config/env.js';
import logger from '../utils/logger.js';

function getTransporter() {
  if (!env.smtp.host) {
    logger.debug('SMTP not configured — email notifications disabled');
    return null;
  }
  return nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: env.smtp.user
      ? { user: env.smtp.user, pass: env.smtp.pass }
      : undefined,
  });
}

async function sendEmailNotification(message) {
  const transporter = getTransporter();
  if (!transporter || !env.smtp.adminEmail) {
    logger.debug('Email notification skipped — transporter or adminEmail missing');
    return;
  }

  try {
    await transporter.sendMail({
      from: env.smtp.from || env.smtp.user,
      to: env.smtp.adminEmail,
      subject: `New Contact Message: ${message.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2 style="color: #1a1a2e;">New Contact Message</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 80px;">Name</td><td style="padding: 8px 0;">${message.name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td style="padding: 8px 0;"><a href="mailto:${message.email}">${message.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Phone</td><td style="padding: 8px 0;">${message.phone || 'N/A'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Subject</td><td style="padding: 8px 0;">${message.subject}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;">
            <p style="font-weight: bold; margin: 0 0 8px;">Message:</p>
            <p style="background: #f5f5f5; padding: 12px; border-radius: 4px; margin: 0;">${message.message}</p>
          </body>
        </html>
      `,
    });
    logger.info('Email notification sent', { messageId: message.id, recipient: env.smtp.adminEmail });
  } catch (error) {
    logger.warn('Failed to send email notification', { messageId: message.id, error });
  }
}

async function sendWebhookNotification(message) {
  if (!env.webhook.url) return;

  try {
    const response = await fetch(env.webhook.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'contact_message.created',
        data: {
          id: message.id,
          name: message.name,
          email: message.email,
          phone: message.phone,
          subject: message.subject,
          message: message.message,
          created_at: message.createdAt,
        },
      }),
    });

    if (!response.ok) {
      logger.warn('Webhook notification failed', {
        messageId: message.id,
        status: response.status,
      });
      return;
    }

    logger.info('Webhook notification sent', { messageId: message.id });
  } catch (error) {
    logger.warn('Failed to send webhook notification', { messageId: message.id, error });
  }
}

export async function notifyNewMessage(message) {
  await Promise.allSettled([
    sendEmailNotification(message),
    sendWebhookNotification(message),
  ]);
}
