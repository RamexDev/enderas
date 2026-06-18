module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('partners', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      logo: Sequelize.STRING(255),
      website_url: Sequelize.STRING(255),
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
    await queryInterface.addIndex('partners', ['is_active'], { name: 'partners_is_active_index' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('partners');
  },
};
