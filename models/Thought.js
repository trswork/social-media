const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    UserName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
  );

const ThoughtSchema = new Schema({
    ThoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    UserName: {
        type: String,
        required: true
    },
       Reactions: [ReactionSchema],
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
  );

const Thought = model('Thought', ThoughtSchema);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

module.exports = Thought; 