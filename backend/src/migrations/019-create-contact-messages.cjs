module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contact_messages', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      email: { type: Sequelize.STRING(255), allowNull: false },
      phone: Sequelize.STRING(255),
      subject: { type: Sequelize.STRING(255), allowNull: false },
      message: { type: Sequelize.TEXT, allowNull: false },
      is_read: { type: Sequelize.BOOLEAN, defaultValue: false },
      is_archived: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.addIndex('contact_messages', ['is_read'], { name: 'contact_messages_is_read_index' });
    await queryInterface.addIndex('contact_messages', ['is_archived'], { name: 'contact_messages_is_archived_index' });
    await queryInterface.addIndex('contact_messages', ['created_at'], { name: 'contact_messages_created_at_index' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('contact_messages');
  },
};
