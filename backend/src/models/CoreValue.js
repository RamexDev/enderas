import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const CoreValue = sequelize.define('CoreValue', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: DataTypes.TEXT,
}, {
  tableName: 'core_values',
  underscored: true,
  timestamps: true,
});

export default CoreValue;
