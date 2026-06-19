import { v4 as uuidv4 } from 'uuid';
import { AboutPage, CoreValue, Partner, TeamMember, HomePage } from '../models/index.js';
import { pickFields } from '../utils/pickFields.js';
import {
  ABOUT_PAGE_FIELDS,
  CORE_VALUE_FIELDS,
  PARTNER_FIELDS,
} from '../constants/fieldAllowlists.js';

export async function getAboutPage() {
  let about = await AboutPage.findOne();
  if (!about) about = await AboutPage.create({ id: uuidv4() });
  return about;
}

export async function updateAboutPage(data) {
  let about = await AboutPage.findOne();
  if (!about) about = await AboutPage.create({ id: uuidv4() });
  await about.update(pickFields(data, ABOUT_PAGE_FIELDS));
  return about;
}

export async function listCoreValues() {
  return CoreValue.findAll({ order: [['created_at', 'ASC']] });
}

export async function createCoreValue(data) {
  return CoreValue.create(pickFields(data, CORE_VALUE_FIELDS));
}

export async function updateCoreValue(id, data) {
  const val = await CoreValue.findByPk(id);
  if (!val) throw Object.assign(new Error('Core value not found'), { statusCode: 404 });
  await val.update(pickFields(data, CORE_VALUE_FIELDS));
  return val;
}

export async function deleteCoreValue(id) {
  const val = await CoreValue.findByPk(id);
  if (!val) throw Object.assign(new Error('Core value not found'), { statusCode: 404 });
  await val.destroy();
}

export async function listPartners() {
  return Partner.findAll({ order: [['name', 'ASC']] });
}

export async function createPartner(data) {
  return Partner.create(pickFields(data, PARTNER_FIELDS));
}

export async function updatePartner(id, data) {
  const partner = await Partner.findByPk(id);
  if (!partner) throw Object.assign(new Error('Partner not found'), { statusCode: 404 });
  await partner.update(pickFields(data, PARTNER_FIELDS));
  return partner;
}

export async function deletePartner(id) {
  const partner = await Partner.findByPk(id);
  if (!partner) throw Object.assign(new Error('Partner not found'), { statusCode: 404 });
  await partner.destroy();
}

export async function togglePartnerStatus(id) {
  const partner = await Partner.findByPk(id);
  if (!partner) throw Object.assign(new Error('Partner not found'), { statusCode: 404 });
  await partner.update({ is_active: !partner.is_active });
  return partner;
}

export async function getPublicAbout() {
  const about = await getAboutPage();
  const coreValues = await CoreValue.findAll({ order: [['created_at', 'ASC']] });
  const partners = await Partner.findAll({ where: { is_active: true }, order: [['name', 'ASC']] });

  let homePage = await HomePage.findOne();
  if (!homePage) homePage = await HomePage.create({ id: uuidv4() });

  let teamMembers = [];
  if (homePage.show_team) {
    teamMembers = await TeamMember.findAll({ where: { is_active: true }, order: [['created_at', 'ASC']] });
  }

  const cta = {
    title: homePage.contact_cta_title,
    body: homePage.contact_cta_description,
    primary_label: homePage.contact_cta_button_text,
    primary_link: homePage.contact_cta_button_link,
  };

  return { about, coreValues, partners, teamMembers, show_team: homePage.show_team, cta };
}
