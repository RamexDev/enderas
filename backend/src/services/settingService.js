import { v4 as uuidv4 } from 'uuid';
import { SiteSetting } from '../models/index.js';
import { pickFields } from '../utils/pickFields.js';
import { SITE_SETTING_FIELDS } from '../constants/fieldAllowlists.js';

export async function getSettings() {
  let settings = await SiteSetting.findOne();
  if (!settings) settings = await SiteSetting.create({ id: uuidv4() });
  return settings;
}

export async function updateSettings(data) {
  let settings = await SiteSetting.findOne();
  if (!settings) settings = await SiteSetting.create({ id: uuidv4() });
  await settings.update(pickFields(data, SITE_SETTING_FIELDS));
  return settings;
}
