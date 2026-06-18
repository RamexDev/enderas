import { v4 as uuidv4 } from 'uuid';
import { ContactPage, ContactMessage } from '../models/index.js';

export async function getContactPage() {
  let contact = await ContactPage.findOne();
  if (!contact) contact = await ContactPage.create({ id: uuidv4() });
  return contact;
}

export async function updateContactPage(data) {
  let contact = await ContactPage.findOne();
  if (!contact) contact = await ContactPage.create({ id: uuidv4() });
  await contact.update(data);
  return contact;
}

export async function submitContactMessage(data) {
  return ContactMessage.create({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    subject: data.subject,
    message: data.message,
  });
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
  if (!msg) throw Object.assign(new Error('Message not found'), { statusCode: 404 });
  return msg;
}

export async function markMessageRead(id) {
  const msg = await ContactMessage.findByPk(id);
  if (!msg) throw Object.assign(new Error('Message not found'), { statusCode: 404 });
  await msg.update({ is_read: true });
  return msg;
}

export async function archiveMessage(id) {
  const msg = await ContactMessage.findByPk(id);
  if (!msg) throw Object.assign(new Error('Message not found'), { statusCode: 404 });
  await msg.update({ is_archived: true });
  return msg;
}
