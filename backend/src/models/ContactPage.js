import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ContactPage = sequelize.define('ContactPage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  address: DataTypes.TEXT,
  phone: DataTypes.STRING(255),
  email: DataTypes.STRING(255),
  google_map_embed: DataTypes.TEXT,
  meta_title: DataTypes.STRING(255),
  meta_description: DataTypes.TEXT,
}, {
  tableName: 'contact_page',
  underscored: true,
  timestamps: true,
  updatedAt: true,
  createdAt: false,
});

export default ContactPage;
