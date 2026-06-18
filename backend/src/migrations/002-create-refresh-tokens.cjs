module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('refresh_tokens', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      token_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('refresh_tokens', ['token_hash'], {
      name: 'refresh_tokens_token_hash_index',
    });

    await queryInterface.addIndex('refresh_tokens', ['user_id'], {
      name: 'refresh_tokens_user_id_index',
    });

    await queryInterface.addIndex('refresh_tokens', ['expires_at'], {
      name: 'refresh_tokens_expires_at_index',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('refresh_tokens');
  },
};
