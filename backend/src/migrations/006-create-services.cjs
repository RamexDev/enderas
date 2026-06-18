module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('services', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      title: { type: Sequelize.STRING(255), allowNull: false },
      slug: { type: Sequelize.STRING(255), allowNull: false },
      short_description: Sequelize.TEXT,
      description: Sequelize.TEXT,
      image: Sequelize.STRING(255),
      cta_text: Sequelize.STRING(255),
      cta_link: Sequelize.STRING(255),
      meta_title: Sequelize.STRING(255),
      meta_description: Sequelize.TEXT,
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
    await queryInterface.addIndex('services', ['slug'], { name: 'services_slug_unique', unique: true });
    await queryInterface.addIndex('services', ['is_active'], { name: 'services_is_active_index' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('services');
  },
};
