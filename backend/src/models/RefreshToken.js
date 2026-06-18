import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RefreshToken = sequelize.define('RefreshToken', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  token_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'refresh_tokens',
  underscored: true,
  timestamps: true,
  updatedAt: false,
  indexes: [
    {
      fields: ['token_hash'],
    },
    {
      fields: ['user_id'],
    },
    {
      fields: ['expires_at'],
    },
  ],
});

export default RefreshToken;
