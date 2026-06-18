import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Statistic = sequelize.define('Statistic', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  label: { type: DataTypes.STRING(255), allowNull: false },
  value: { type: DataTypes.STRING(255), allowNull: false },
  icon: DataTypes.STRING(255),
}, {
  tableName: 'statistics',
  underscored: true,
  timestamps: true,
});

export default Statistic;
