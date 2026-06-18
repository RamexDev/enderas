import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ContactMessage = sequelize.define('ContactMessage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false },
  phone: DataTypes.STRING(255),
  subject: { type: DataTypes.STRING(255), allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_archived: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: 'contact_messages',
  underscored: true,
  timestamps: true,
  updatedAt: false,
  indexes: [
    { fields: ['is_read'] },
    { fields: ['is_archived'] },
    { fields: ['created_at'] },
  ],
});

export default ContactMessage;
