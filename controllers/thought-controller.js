const { User, Thought } = require('../models');

const thoughtController = {
    // createthought
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thought: _id } },
              { new: true }
            );
          })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },

    // get all Thoughts
        getAllThoughts(req, res) {
            Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

// get thought by id
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
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
//update thought by id
         updateThought({ params }, res) {
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
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;