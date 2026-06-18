module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('about_page', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      history: Sequelize.TEXT,
      mission: Sequelize.TEXT,
      vision: Sequelize.TEXT,
      meta_title: Sequelize.STRING(255),
      meta_description: Sequelize.TEXT,
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('about_page');
  },
};
