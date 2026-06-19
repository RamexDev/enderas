import { v4 as uuidv4 } from 'uuid';
import { ContactPage, ContactMessage } from '../models/index.js';
import { AppError } from '../utils/AppError.js';
import logger from '../utils/logger.js';
import { notifyNewMessage } from './notificationService.js';
import { pickFields } from '../utils/pickFields.js';
import { CONTACT_PAGE_FIELDS } from '../constants/fieldAllowlists.js';

function stripHtml(value) {
  return value.replace(/<[^>]*>/g, '').trim();
}

export async function getContactPage() {
  let contact = await ContactPage.findOne();
  if (!contact) contact = await ContactPage.create({ id: uuidv4() });
  return contact;
}

export async function updateContactPage(data) {
  let contact = await ContactPage.findOne();
  if (!contact) contact = await ContactPage.create({ id: uuidv4() });
  await contact.update(pickFields(data, CONTACT_PAGE_FIELDS));
  return contact;
}

export async function submitContactMessage(data) {
  const message = await ContactMessage.create({
    name: stripHtml(data.name),
    email: data.email,
    phone: data.phone || null,
    subject: stripHtml(data.subject),
    message: stripHtml(data.message),
  });

  logger.info('Contact message submitted', {
    messageId: message.id,
    name: message.name,
    email: message.email,
  });

  notifyNewMessage(message);

  return message;
}

export async function listContactMessages(page = 1, limit = 10, archived = false) {
  const offset = (page - 1) * limit;
  const { count, rows } = await ContactMessage.findAndCountAll({
    where: { is_archived: archived },
    order: [['created_at', 'DESC']],
    offset,
    limit,
  });
  return { data: rows, total: count, page, limit };
}

export async function getContactMessage(id) {
  const msg = await ContactMessage.findByPk(id);
  if (!msg) throw new AppError('Message not found', 404);
  return msg;
}

export async function markMessageRead(id) {
  const msg = await ContactMessage.findByPk(id);
  if (!msg) throw new AppError('Message not found', 404);
  await msg.update({ is_read: true });
  return msg;
}

export async function archiveMessage(id) {
  const msg = await ContactMessage.findByPk(id);
  if (!msg) throw new AppError('Message not found', 404);
  await msg.update({ is_archived: true });
  return msg;
}

export async function markMessageUnread(id) {
  const msg = await ContactMessage.findByPk(id);
  if (!msg) throw new AppError('Message not found', 404);
  await msg.update({ is_read: false });
  return msg;
}

export async function unarchiveMessage(id) {
  const msg = await ContactMessage.findByPk(id);
  if (!msg) throw new AppError('Message not found', 404);
  await msg.update({ is_archived: false });
  return msg;
}

export async function getUnreadMessages(limit = 3) {
  const { count, rows } = await ContactMessage.findAndCountAll({
    where: { is_read: false, is_archived: false },
    order: [['created_at', 'DESC']],
    limit,
  });
  return { count, messages: rows };
}

export async function deleteMessage(id) {
  const msg = await ContactMessage.findByPk(id);
  if (!msg) throw new AppError('Message not found', 404);
  await msg.destroy();
  return { id };
}
