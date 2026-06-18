module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('testimonials', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      client_name: { type: Sequelize.STRING(255), allowNull: false },
      company: Sequelize.STRING(255),
      content: { type: Sequelize.TEXT, allowNull: false },
      client_image: Sequelize.STRING(255),
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
    await queryInterface.addIndex('testimonials', ['is_active'], { name: 'testimonials_is_active_index' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('testimonials');
  },
};
