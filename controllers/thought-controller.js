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
    .populate({ path: 'reactions', 
        select: '-__v' })
        .select('-__v')
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
        .then(dbThoughtData => {
          User.findOneAndUpdate(
              {_id: body.userId},
              {$push: { thoughts: dbThoughtData._id }},
              {new: true}
          )
          .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    })
},

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
       .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
        .then(() => {
          res.json({message: 'Thought successfully deleted!'});
      })
      .catch(err => res.status(400).json(err));
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => res.json(err));
},

// add reaction
createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $push: { reactions: body } },
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
    { $pull: {reactions: {reactionId: params.reactionId} } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUsertData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
}

module.exports = thoughtController;