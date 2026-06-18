module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('faqs', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      question: { type: Sequelize.TEXT, allowNull: false },
      answer: { type: Sequelize.TEXT, allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
    await queryInterface.addIndex('faqs', ['is_active'], { name: 'faqs_is_active_index' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('faqs');
  },
};
