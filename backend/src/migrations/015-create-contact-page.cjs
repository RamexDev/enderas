module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contact_page', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      address: Sequelize.TEXT,
      phone: Sequelize.STRING(255),
      email: Sequelize.STRING(255),
      google_map_embed: Sequelize.TEXT,
      meta_title: Sequelize.STRING(255),
      meta_description: Sequelize.TEXT,
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('contact_page');
  },
};
