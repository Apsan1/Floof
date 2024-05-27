const User = require('./user');
const Video = require('./video');

// Define associations
Video.belongsTo(User);
User.hasMany(Video);

module.exports = {
  User,
  Video
};
