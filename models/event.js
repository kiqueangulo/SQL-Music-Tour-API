'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Stage, Stage_Events, Meet_Greet, Set_Time }) {
      // Many to many relationship
      Event.belongsToMany(Stage, {
        foreignKey: 'event_id',
        as: 'stages',
        through: Stage_Events
      });

      Event.hasMany(Set_Time, {
        foreignKey: 'event_id'
      });

      Event.hasMany(Meet_Greet, {
        foreignKey: 'event_id'
      });
    }
  }

  Event.init({
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false
  });

  return Event;
};