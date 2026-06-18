module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      title: { type: Sequelize.STRING(255), allowNull: false },
      slug: { type: Sequelize.STRING(255), allowNull: false },
      excerpt: Sequelize.TEXT,
      content: Sequelize.TEXT('long'),
      featured_image: Sequelize.STRING(255),
      status: { type: Sequelize.ENUM('draft', 'published'), defaultValue: 'draft' },
      meta_title: Sequelize.STRING(255),
      meta_description: Sequelize.TEXT,
      author_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      published_at: Sequelize.DATE,
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
    await queryInterface.addIndex('posts', ['slug'], { name: 'posts_slug_unique', unique: true });
    await queryInterface.addIndex('posts', ['status', 'created_at'], { name: 'posts_status_created_index' });
    await queryInterface.addIndex('posts', ['author_id'], { name: 'posts_author_id_index' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('posts');
  },
};
