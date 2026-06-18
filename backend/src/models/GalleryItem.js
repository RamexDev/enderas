import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const GalleryItem = sequelize.define('GalleryItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: DataTypes.STRING(255),
  description: DataTypes.TEXT,
  image: { type: DataTypes.STRING(255), allowNull: false },
  category_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: 'gallery_categories', key: 'id' },
  },
}, {
  tableName: 'gallery_items',
  underscored: true,
  timestamps: true,
  paranoid: true,
  indexes: [
    { fields: ['category_id'] },
  ],
});

export default GalleryItem;
