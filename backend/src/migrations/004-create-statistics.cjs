module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('statistics', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      label: { type: Sequelize.STRING(255), allowNull: false },
      value: { type: Sequelize.STRING(255), allowNull: false },
      icon: Sequelize.STRING(255),
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('statistics');
  },
};
