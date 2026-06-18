import { v4 as uuidv4 } from 'uuid';
import { SiteSetting } from '../models/index.js';

export async function getSettings() {
  let settings = await SiteSetting.findOne();
  if (!settings) settings = await SiteSetting.create({ id: uuidv4() });
  return settings;
}

export async function updateSettings(data) {
  let settings = await SiteSetting.findOne();
  if (!settings) settings = await SiteSetting.create({ id: uuidv4() });
  await settings.update(data);
  return settings;
}
