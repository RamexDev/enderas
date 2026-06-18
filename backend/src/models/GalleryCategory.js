import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const GalleryCategory = sequelize.define('GalleryCategory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING(255), allowNull: false },
  slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
}, {
  tableName: 'gallery_categories',
  underscored: true,
  timestamps: true,
  indexes: [
    { fields: ['slug'], unique: true },
  ],
});

export default GalleryCategory;
