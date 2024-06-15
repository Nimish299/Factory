const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emailID: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    // New fields for additional user information
    company: {
      type: String,
      // Add any other details related to the user's company
    },
    address: {
      type: String,
      // Add any other address-related details if needed
    },
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // If password is not modified, move to the next middleware
  }

  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Static method to login user
userSchema.statics.login = async function (emailID, password) {
  const user = await this.findOne({ emailID });
  if (!user) throw Error('no such user');
  const auth = await bcrypt.compare(password, user.password);
  if (!auth) throw Error('wrong password');
  return user;
};

module.exports = mongoose.model('User', userSchema);
