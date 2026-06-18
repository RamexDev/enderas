module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gallery_items', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      title: Sequelize.STRING(255),
      description: Sequelize.TEXT,
      image: { type: Sequelize.STRING(255), allowNull: false },
      category_id: { type: Sequelize.UUID, allowNull: true, references: { model: 'gallery_categories', key: 'id' }, onDelete: 'SET NULL' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
    await queryInterface.addIndex('gallery_items', ['category_id'], { name: 'gallery_items_category_id_index' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('gallery_items');
  },
};
