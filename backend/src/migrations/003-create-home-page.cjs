module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('home_page', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      company_intro_title: Sequelize.STRING(255),
      company_intro_description: Sequelize.TEXT,
      company_intro_cta_text: Sequelize.STRING(255),
      company_intro_cta_link: Sequelize.STRING(255),
      auction_title: Sequelize.STRING(255),
      auction_description: Sequelize.TEXT,
      auction_cta_text: Sequelize.STRING(255),
      auction_cta_link: Sequelize.STRING(255),
      contact_cta_title: Sequelize.STRING(255),
      contact_cta_description: Sequelize.TEXT,
      contact_cta_button_text: Sequelize.STRING(255),
      contact_cta_button_link: Sequelize.STRING(255),
      show_team: { type: Sequelize.BOOLEAN, defaultValue: true },
      show_testimonials: { type: Sequelize.BOOLEAN, defaultValue: true },
      show_faq: { type: Sequelize.BOOLEAN, defaultValue: true },
      meta_title: Sequelize.STRING(255),
      meta_description: Sequelize.TEXT,
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('home_page');
  },
};
