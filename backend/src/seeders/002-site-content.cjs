/**
 * Seeds CMS content from docs/existing/*.html (enderas.org export).
 * Idempotent — skips tables that already have rows.
 */
const crypto = require('crypto');
const content = require('./data/site-content.cjs');

function uuid() {
  return crypto.randomUUID();
}

function stamp(rows) {
  const ts = content.timestamp;
  return rows.map((row) => ({ ...row, created_at: ts, updated_at: ts }));
}

module.exports = {
  async up(queryInterface) {
    const ts = content.timestamp;

    // Site settings (single row)
    const settingsCount = await queryInterface.rawSelect('site_settings', { where: {} }, ['id']);
    if (!settingsCount) {
      await queryInterface.bulkInsert('site_settings', [{
        id: uuid(),
        ...content.siteSettings,
        updated_at: ts,
      }]);
      console.log('Seeded site settings');
    }

    // Homepage (single row)
    const homeCount = await queryInterface.rawSelect('home_page', { where: {} }, ['id']);
    if (!homeCount) {
      await queryInterface.bulkInsert('home_page', [{
        id: uuid(),
        ...content.homePage,
        updated_at: ts,
      }]);
      console.log('Seeded home page');
    }

    // Hero slides
    const heroCount = await queryInterface.rawSelect('hero_slides', { where: {} }, ['id']);
    if (!heroCount) {
      await queryInterface.bulkInsert('hero_slides', stamp(
        content.heroSlides.map((slide) => ({ id: uuid(), ...slide }))
      ));
      console.log(`Seeded ${content.heroSlides.length} hero slides`);
    }

    // Statistics
    const statsCount = await queryInterface.rawSelect('statistics', { where: {} }, ['id']);
    if (!statsCount) {
      await queryInterface.bulkInsert('statistics', stamp(
        content.statistics.map((stat) => ({ id: uuid(), ...stat }))
      ));
      console.log(`Seeded ${content.statistics.length} statistics`);
    }

    // Services
    const servicesCount = await queryInterface.rawSelect('services', { where: {} }, ['id']);
    if (!servicesCount) {
      await queryInterface.bulkInsert('services', stamp(
        content.services.map((service) => ({ id: uuid(), ...service }))
      ));
      console.log(`Seeded ${content.services.length} services`);
    }

    // About page (single row)
    const aboutCount = await queryInterface.rawSelect('about_page', { where: {} }, ['id']);
    if (!aboutCount) {
      await queryInterface.bulkInsert('about_page', [{
        id: uuid(),
        ...content.aboutPage,
        updated_at: ts,
      }]);
      console.log('Seeded about page');
    }

    // Core values
    const coreValuesCount = await queryInterface.rawSelect('core_values', { where: {} }, ['id']);
    if (!coreValuesCount) {
      await queryInterface.bulkInsert('core_values', stamp(
        content.coreValues.map((value) => ({ id: uuid(), ...value }))
      ));
      console.log(`Seeded ${content.coreValues.length} core values`);
    }

    // Contact page (single row)
    const contactCount = await queryInterface.rawSelect('contact_page', { where: {} }, ['id']);
    if (!contactCount) {
      await queryInterface.bulkInsert('contact_page', [{
        id: uuid(),
        ...content.contactPage,
        updated_at: ts,
      }]);
      console.log('Seeded contact page');
    }

    // Gallery categories + items
    const galleryCatCount = await queryInterface.rawSelect('gallery_categories', { where: {} }, ['id']);
    const categoryIds = {};
    if (!galleryCatCount) {
      const categories = content.galleryCategories.map((cat) => {
        const id = uuid();
        categoryIds[cat.slug] = id;
        return { id, ...cat, created_at: ts, updated_at: ts };
      });
      await queryInterface.bulkInsert('gallery_categories', categories);
      console.log(`Seeded ${categories.length} gallery categories`);

      const items = content.galleryItems.map((item) => ({
        id: uuid(),
        title: item.title,
        description: item.description,
        image: item.image,
        category_id: categoryIds[item.category_slug] || null,
        created_at: ts,
        updated_at: ts,
      }));
      await queryInterface.bulkInsert('gallery_items', items);
      console.log(`Seeded ${items.length} gallery items`);
    }

    // Blog categories + posts
    const blogCatCount = await queryInterface.rawSelect('categories', { where: {} }, ['id']);
    const blogCategoryIds = {};
    if (!blogCatCount) {
      const categories = content.categories.map((cat) => {
        const id = uuid();
        blogCategoryIds[cat.slug] = id;
        return { id, ...cat, created_at: ts, updated_at: ts };
      });
      await queryInterface.bulkInsert('categories', categories);
      console.log(`Seeded ${categories.length} blog categories`);

      const adminId = await queryInterface.rawSelect('users', {
        where: { role: 'super_admin' },
      }, ['id']);

      const posts = content.posts.map((post) => ({
        id: uuid(),
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.featured_image,
        status: post.status,
        author_id: adminId || null,
        published_at: post.published_at,
        created_at: ts,
        updated_at: ts,
      }));
      await queryInterface.bulkInsert('posts', posts);

      const postCategoryRows = [];
      content.posts.forEach((post, index) => {
        post.category_slugs.forEach((slug) => {
          if (blogCategoryIds[slug]) {
            postCategoryRows.push({
              post_id: posts[index].id,
              category_id: blogCategoryIds[slug],
            });
          }
        });
      });
      if (postCategoryRows.length) {
        await queryInterface.bulkInsert('post_categories', postCategoryRows);
      }
      console.log(`Seeded ${posts.length} blog posts`);
    }

    // FAQs
    const faqCount = await queryInterface.rawSelect('faqs', { where: {} }, ['id']);
    if (!faqCount) {
      await queryInterface.bulkInsert('faqs', stamp(
        content.faqs.map((faq) => ({ id: uuid(), ...faq }))
      ));
      console.log(`Seeded ${content.faqs.length} FAQs`);
    }

    // Testimonials
    const testimonialCount = await queryInterface.rawSelect('testimonials', { where: {} }, ['id']);
    if (!testimonialCount) {
      await queryInterface.bulkInsert('testimonials', stamp(
        content.testimonials.map((t) => ({ id: uuid(), ...t }))
      ));
      console.log(`Seeded ${content.testimonials.length} testimonials`);
    }

    // Team members
    const teamCount = await queryInterface.rawSelect('team_members', { where: {} }, ['id']);
    if (!teamCount) {
      await queryInterface.bulkInsert('team_members', stamp(
        content.teamMembers.map((member) => ({ id: uuid(), ...member }))
      ));
      console.log(`Seeded ${content.teamMembers.length} team members`);
    }

    // Partners
    const partnerCount = await queryInterface.rawSelect('partners', { where: {} }, ['id']);
    if (!partnerCount) {
      await queryInterface.bulkInsert('partners', stamp(
        content.partners.map((partner) => ({ id: uuid(), ...partner }))
      ));
      console.log(`Seeded ${content.partners.length} partners`);
    }

    console.log('Site content seeding complete');
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('post_categories', null, {});
    await queryInterface.bulkDelete('posts', null, {});
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('gallery_items', null, {});
    await queryInterface.bulkDelete('gallery_categories', null, {});
    await queryInterface.bulkDelete('partners', null, {});
    await queryInterface.bulkDelete('team_members', null, {});
    await queryInterface.bulkDelete('testimonials', null, {});
    await queryInterface.bulkDelete('faqs', null, {});
    await queryInterface.bulkDelete('core_values', null, {});
    await queryInterface.bulkDelete('contact_page', null, {});
    await queryInterface.bulkDelete('about_page', null, {});
    await queryInterface.bulkDelete('services', null, {});
    await queryInterface.bulkDelete('statistics', null, {});
    await queryInterface.bulkDelete('hero_slides', null, {});
    await queryInterface.bulkDelete('home_page', null, {});
    await queryInterface.bulkDelete('site_settings', null, {});
  },
};
