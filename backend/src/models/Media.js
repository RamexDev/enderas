import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Media = sequelize.define('Media', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  filename: { type: DataTypes.STRING(255), allowNull: false },
  original_name: { type: DataTypes.STRING(255), allowNull: false },
  path: { type: DataTypes.STRING(255), allowNull: false },
  mime_type: DataTypes.STRING(255),
  file_size: DataTypes.INTEGER,
  uploaded_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'users', key: 'id' },
  },
}, {
  tableName: 'media',
  underscored: true,
  timestamps: true,
  updatedAt: false,
  indexes: [
    { fields: ['uploaded_by'] },
  ],
});

export default Media;
