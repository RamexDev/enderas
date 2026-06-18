import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Faq = sequelize.define('Faq', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  question: { type: DataTypes.TEXT, allowNull: false },
  answer: { type: DataTypes.TEXT, allowNull: false },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'faqs',
  underscored: true,
  timestamps: true,
  paranoid: true,
  indexes: [
    { fields: ['is_active'] },
  ],
});

export default Faq;
