module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('team_members', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      full_name: { type: Sequelize.STRING(255), allowNull: false },
      email: Sequelize.STRING(255),
      position: Sequelize.STRING(255),
      biography: Sequelize.TEXT,
      profile_image: Sequelize.STRING(255),
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
    await queryInterface.addIndex('team_members', ['is_active'], { name: 'team_members_is_active_index' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('team_members');
  },
};
