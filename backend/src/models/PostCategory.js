import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PostCategory = sequelize.define('PostCategory', {
  post_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'posts', key: 'id' },
    onDelete: 'CASCADE',
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'categories', key: 'id' },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'post_categories',
  underscored: true,
  timestamps: false,
  indexes: [
    { fields: ['post_id', 'category_id'], unique: true },
  ],
});

export default PostCategory;
