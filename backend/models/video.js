const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Assuming you have initialized Sequelize connection

const Video = sequelize.define('Video', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  createdDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Video;
