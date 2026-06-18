module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('site_settings', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      site_name: Sequelize.STRING(255),
      site_description: Sequelize.TEXT,
      logo: Sequelize.STRING(255),
      favicon: Sequelize.STRING(255),
      footer_text: Sequelize.TEXT,
      copyright_text: Sequelize.STRING(255),
      facebook_url: Sequelize.STRING(255),
      linkedin_url: Sequelize.STRING(255),
      instagram_url: Sequelize.STRING(255),
      twitter_url: Sequelize.STRING(255),
      youtube_url: Sequelize.STRING(255),
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('site_settings');
  },
};
