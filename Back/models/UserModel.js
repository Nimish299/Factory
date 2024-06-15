const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: 'https://i.imgur.com/wvxPV9S.png', // Default profile image URL
    },
    emailID: {
      type: String,
      required: true,
      unique: true, // Ensure emailID is unique
    },
    password: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      // You can add any other details related to the user's company here
    },
    address: {
      type: String,
      // You can add any other address-related details here if needed
    },
    social_media_links: {
      facebook: {
        type: String,
      },
      twitter: {
        type: String,
      },
      instagram: {
        type: String,
      },
      youtube: {
        type: String,
      },
    },
    cards: [
      {
        cardId: {
          type: String,
        },
      },
    ],
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
