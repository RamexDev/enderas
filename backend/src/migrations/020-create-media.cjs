module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('media', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      filename: { type: Sequelize.STRING(255), allowNull: false },
      original_name: { type: Sequelize.STRING(255), allowNull: false },
      path: { type: Sequelize.STRING(255), allowNull: false },
      mime_type: Sequelize.STRING(255),
      file_size: Sequelize.INTEGER,
      uploaded_by: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.addIndex('media', ['uploaded_by'], { name: 'media_uploaded_by_index' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('media');
  },
};
