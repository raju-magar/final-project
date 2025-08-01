const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employer', 'job-seeker'], default: 'job-seeker' },
  profile: { fullName: { type: String } },
  mobile: { type: String }
});

module.exports = mongoose.model('User', userSchema);