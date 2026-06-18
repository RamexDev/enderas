import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING(255), allowNull: false },
  slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
}, {
  tableName: 'categories',
  underscored: true,
  timestamps: true,
  indexes: [
    { fields: ['slug'], unique: true },
  ],
});

export default Category;
