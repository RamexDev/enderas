module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('post_categories', {
      post_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'posts', key: 'id' }, onDelete: 'CASCADE' },
      category_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'categories', key: 'id' }, onDelete: 'CASCADE' },
    });
    await queryInterface.addIndex('post_categories', ['post_id', 'category_id'], { name: 'post_categories_unique', unique: true });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('post_categories');
  },
};
