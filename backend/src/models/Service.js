import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING(255), allowNull: false },
  slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  short_description: DataTypes.TEXT,
  description: DataTypes.TEXT,
  image: DataTypes.STRING(255),
  cta_text: DataTypes.STRING(255),
  cta_link: DataTypes.STRING(255),
  meta_title: DataTypes.STRING(255),
  meta_description: DataTypes.TEXT,
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'services',
  underscored: true,
  timestamps: true,
  paranoid: true,
  indexes: [
    { fields: ['slug'], unique: true },
    { fields: ['is_active'] },
  ],
});

export default Service;
