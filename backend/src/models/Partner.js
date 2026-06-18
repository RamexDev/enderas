import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Partner = sequelize.define('Partner', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING(255), allowNull: false },
  logo: DataTypes.STRING(255),
  website_url: DataTypes.STRING(255),
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'partners',
  underscored: true,
  timestamps: true,
  paranoid: true,
  indexes: [
    { fields: ['is_active'] },
  ],
});

export default Partner;
