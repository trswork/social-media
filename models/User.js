const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    UserName: {
      type: String,
      unique: true,
      trim: true,
      required: 'User Name is Required'
    },

    email: {
      type: String,
      unique: true,
      required: 'Last Name is Required'
    },

    password: {
      type: String,
      trim: true,
      required: 'Password is Required',
      validate: [({ length }) => length >= 6, 'Password should be longer.']
    },

    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },

    userCreated: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

UserSchema.virtual('username').get(function() {
  return this.email.slice(0, this.email.indexOf('@'));
});

const User = model('User', UserSchema);

module.exports = User;
