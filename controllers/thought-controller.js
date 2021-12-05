const { User, Thought, Reaction } = require('../models');

const thoughtController = {
    // get all Thoughts
        getAllThought(req, res) {
            Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // get thought by id
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},
// createthought
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
// add thought
addThought({ params, body }, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $push: { thought: body } },
    { new: true, runValidators: true }
  )},

//update thought by id
         updateThought({ params, body }, res) {
           Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
             .then(dbThoughtData => {
               if (!dbThoughtData) {
                 res.status(404).json({ message: 'No thought found with this id!' });
                 return;
               }
               res.json(dbThoughtData);
             })
             .catch(err => res.status(400).json(err));
         },

// delete thought by id
       deleteThought({ params }, res) {
       Thought.findOneAndDelete({ _id: params.id })
       .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { comments: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

// add reaction
addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { reactionId: params.reactionId } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No reation found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // remove reaction
deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactionId: params.reactionId } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
}

module.exports = thoughtController;