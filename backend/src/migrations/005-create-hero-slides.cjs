module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hero_slides', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      title: Sequelize.STRING(255),
      subtitle: Sequelize.TEXT,
      image: { type: Sequelize.STRING(255), allowNull: false },
      button_text: Sequelize.STRING(255),
      button_link: Sequelize.STRING(255),
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('hero_slides');
  },
};
