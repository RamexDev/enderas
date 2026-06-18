import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AboutPage = sequelize.define('AboutPage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  history: DataTypes.TEXT,
  mission: DataTypes.TEXT,
  vision: DataTypes.TEXT,
  meta_title: DataTypes.STRING(255),
  meta_description: DataTypes.TEXT,
}, {
  tableName: 'about_page',
  underscored: true,
  timestamps: true,
  updatedAt: true,
  createdAt: false,
});

export default AboutPage;
