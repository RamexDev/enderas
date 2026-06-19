import nodemailer from 'nodemailer';
import env from '../config/env.js';
import logger from '../utils/logger.js';

function getTransporter() {
  if (!env.smtp.host) return null;
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
  if (!transporter || !env.smtp.adminEmail) return;

  try {
    await transporter.sendMail({
      from: env.smtp.from || env.smtp.user,
      to: env.smtp.adminEmail,
      subject: `New Contact Message: ${message.subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${message.name}</p>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>Phone:</strong> ${message.phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${message.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.message}</p>
      `,
    });
    logger.info('Email notification sent', { messageId: message.id });
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
