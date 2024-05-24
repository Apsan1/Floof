// models/video.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const Video = sequelize.define('Video', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Video;
