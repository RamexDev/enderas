import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING(255), allowNull: false },
  slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  excerpt: DataTypes.TEXT,
  content: DataTypes.TEXT('long'),
  featured_image: DataTypes.STRING(255),
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft',
  },
  meta_title: DataTypes.STRING(255),
  meta_description: DataTypes.TEXT,
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'users', key: 'id' },
  },
  published_at: DataTypes.DATE,
}, {
  tableName: 'posts',
  underscored: true,
  timestamps: true,
  paranoid: true,
  indexes: [
    { fields: ['slug'], unique: true },
    { fields: ['status', 'created_at'] },
    { fields: ['author_id'] },
  ],
});

export default Post;
