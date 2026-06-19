import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SiteSetting = sequelize.define('SiteSetting', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  site_name: DataTypes.STRING(255),
  site_description: DataTypes.TEXT,
  logo: DataTypes.STRING(255),
  favicon: DataTypes.STRING(255),
  footer_text: DataTypes.TEXT,
  copyright_text: DataTypes.STRING(255),
  facebook_url: DataTypes.STRING(255),
  linkedin_url: DataTypes.STRING(255),
  instagram_url: DataTypes.STRING(255),
  twitter_url: DataTypes.STRING(255),
  youtube_url: DataTypes.STRING(255),
  sell_link: DataTypes.STRING(255),
  request_valuation_link: DataTypes.STRING(255),
}, {
  tableName: 'site_settings',
  underscored: true,
  timestamps: true,
  updatedAt: true,
  createdAt: false,
});

export default SiteSetting;
