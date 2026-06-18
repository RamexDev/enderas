import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { ROLES } from '../constants/roles.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(ROLES.SUPER_ADMIN, ROLES.EDITOR),
    allowNull: false,
    defaultValue: ROLES.EDITOR,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  must_change_password: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  last_login_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'users',
  underscored: true,
  timestamps: true,
  indexes: [
    {
      fields: ['email'],
      unique: true,
    },
    {
      fields: ['role'],
    },
  ],
});

export default User;
