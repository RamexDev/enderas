module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('site_settings', 'sell_link', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.addColumn('site_settings', 'request_valuation_link', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('site_settings', 'sell_link');
    await queryInterface.removeColumn('site_settings', 'request_valuation_link');
  },
};
