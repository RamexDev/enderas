import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TeamMember = sequelize.define('TeamMember', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  full_name: { type: DataTypes.STRING(255), allowNull: false },
  email: DataTypes.STRING(255),
  position: DataTypes.STRING(255),
  biography: DataTypes.TEXT,
  profile_image: DataTypes.STRING(255),
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'team_members',
  underscored: true,
  timestamps: true,
  paranoid: true,
  indexes: [
    { fields: ['is_active'] },
  ],
});

export default TeamMember;
