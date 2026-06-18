import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  client_name: { type: DataTypes.STRING(255), allowNull: false },
  company: DataTypes.STRING(255),
  content: { type: DataTypes.TEXT, allowNull: false },
  client_image: DataTypes.STRING(255),
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'testimonials',
  underscored: true,
  timestamps: true,
  paranoid: true,
  indexes: [
    { fields: ['is_active'] },
  ],
});

export default Testimonial;
