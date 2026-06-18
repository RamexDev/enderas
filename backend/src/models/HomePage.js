import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const HomePage = sequelize.define('HomePage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  company_intro_title: DataTypes.STRING(255),
  company_intro_description: DataTypes.TEXT,
  company_intro_cta_text: DataTypes.STRING(255),
  company_intro_cta_link: DataTypes.STRING(255),

  auction_title: DataTypes.STRING(255),
  auction_description: DataTypes.TEXT,
  auction_cta_text: DataTypes.STRING(255),
  auction_cta_link: DataTypes.STRING(255),

  contact_cta_title: DataTypes.STRING(255),
  contact_cta_description: DataTypes.TEXT,
  contact_cta_button_text: DataTypes.STRING(255),
  contact_cta_button_link: DataTypes.STRING(255),

  show_team: { type: DataTypes.BOOLEAN, defaultValue: true },
  show_testimonials: { type: DataTypes.BOOLEAN, defaultValue: true },
  show_faq: { type: DataTypes.BOOLEAN, defaultValue: true },

  meta_title: DataTypes.STRING(255),
  meta_description: DataTypes.TEXT,
}, {
  tableName: 'home_page',
  underscored: true,
  timestamps: true,
  updatedAt: true,
  createdAt: false,
});

export default HomePage;
