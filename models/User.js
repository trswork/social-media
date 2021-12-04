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
      required: 'Email is Required',
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },

    thoughts: [
     {
      type: Schema.Types.ObjectId,
          ref: 'thought'
    } 
    ],
    
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
  ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
