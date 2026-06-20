/**
 * Homepage business logic — home page singleton, statistics, hero slides, and public home aggregation.
 */

import { v4 as uuidv4 } from 'uuid';
import { HomePage, Statistic, HeroSlide, Service, GalleryItem, TeamMember, Testimonial, Faq } from '../models/index.js';
import { AppError } from '../utils/AppError.js';
import { pickFields } from '../utils/pickFields.js';
import {
  HOME_PAGE_FIELDS,
  STATISTIC_FIELDS,
  HERO_SLIDE_FIELDS,
} from '../constants/fieldAllowlists.js';

/** Get or create the single home_page row */
export async function getHomePage() {
  let homePage = await HomePage.findOne();
  if (!homePage) {
    homePage = await HomePage.create({ id: uuidv4() });
  }
  return homePage;
}

export async function updateHomePage(data) {
  let homePage = await HomePage.findOne();
  if (!homePage) {
    homePage = await HomePage.create({ id: uuidv4() });
  }
  await homePage.update(pickFields(data, HOME_PAGE_FIELDS));
  return homePage;
}

export async function listStatistics() {
  return Statistic.findAll({ order: [['created_at', 'ASC']] });
}

export async function createStatistic(data) {
  return Statistic.create(pickFields(data, STATISTIC_FIELDS));
}

export async function updateStatistic(id, data) {
  const stat = await Statistic.findByPk(id);
  if (!stat) throw new AppError(`Statistic with ID ${id} not found`, 404);
  await stat.update(pickFields(data, STATISTIC_FIELDS));
  return stat;
}

export async function deleteStatistic(id) {
  const stat = await Statistic.findByPk(id);
  if (!stat) throw new AppError(`Statistic with ID ${id} not found`, 404);
  await stat.destroy();
}

export async function listHeroSlides() {
  return HeroSlide.findAll({ order: [['created_at', 'ASC']] });
}

export async function createHeroSlide(data) {
  return HeroSlide.create(pickFields(data, HERO_SLIDE_FIELDS));
}

export async function updateHeroSlide(id, data) {
  const slide = await HeroSlide.findByPk(id);
  if (!slide) throw new AppError(`Hero slide with ID ${id} not found`, 404);
  await slide.update(pickFields(data, HERO_SLIDE_FIELDS));
  return slide;
}

export async function deleteHeroSlide(id) {
  const slide = await HeroSlide.findByPk(id);
  if (!slide) throw new AppError(`Hero slide with ID ${id} not found`, 404);
  await slide.destroy();
}

export async function toggleHeroSlideStatus(id) {
  const slide = await HeroSlide.findByPk(id);
  if (!slide) throw new AppError(`Hero slide with ID ${id} not found`, 404);
  await slide.update({ is_active: !slide.is_active });
  return slide;
}

/**
 * Aggregate all public homepage data in a single response.
 * Respects show_team / show_testimonials / show_faq visibility flags.
 */
export async function getPublicHome() {
  const homePage = await getHomePage();
  const heroSlides = await HeroSlide.findAll({ where: { is_active: true }, order: [['created_at', 'ASC']] });
  const statistics = await Statistic.findAll({ order: [['created_at', 'ASC']] });
  const services = await Service.findAll({ where: { is_active: true }, limit: 6, order: [['created_at', 'ASC']] });
  const galleryItems = await GalleryItem.findAll({
    limit: 8,
    order: [['created_at', 'DESC']],
    include: [{ association: 'category', attributes: ['name', 'slug'] }],
  });

  let teamMembers = [];
  if (homePage.show_team) {
    teamMembers = await TeamMember.findAll({ where: { is_active: true }, order: [['created_at', 'ASC']] });
  }

  let testimonials = [];
  if (homePage.show_testimonials) {
    testimonials = await Testimonial.findAll({ where: { is_active: true }, order: [['created_at', 'ASC']] });
  }

  let faqs = [];
  if (homePage.show_faq) {
    faqs = await Faq.findAll({ where: { is_active: true }, order: [['created_at', 'ASC']] });
  }

  return { homePage, heroSlides, statistics, services, galleryItems, teamMembers, testimonials, faqs };
}
