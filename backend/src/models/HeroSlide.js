import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const HeroSlide = sequelize.define('HeroSlide', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: DataTypes.STRING(255),
  subtitle: DataTypes.TEXT,
  image: { type: DataTypes.STRING(255), allowNull: false },
  button_text: DataTypes.STRING(255),
  button_link: DataTypes.STRING(255),
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'hero_slides',
  underscored: true,
  timestamps: true,
});

export default HeroSlide;
