const { User, Thought } = require('../models');

const userController = {
        // get all users
       getAllUser(req, res) {
           User.find({})
            select: '-__v'
             .then(dbUserData => res.json(dbUserData))
             .catch(err => {
               console.log(err);
               res.status(400).json(err);
             });
         },
   // get user by id
         getUserById({ params }, res) {
            User.findOne({ _id: params.id })
            .populate( { path: 'thoughts', 
            select: '-__v' } )
            .populate( { path: 'friends', 
            select: '-__v' } )
            .select('-__v')
             .then(dbUserData => {
               if (!dbUserData) {
                return res.json({message: 'No user found with this id!'})
              }
              return res.json(dbUserData);
            })
          .catch((err) => {
              return res.json(err)})
      },
   // createUser
         createUser({ body }, res) {
           User.create(body)
             .then(dbUserData => res.json(dbUserData))
             .catch(err => res.status(400).json(err));
         },
   // update User by id
         updateUser({ params, body }, res) {
           User.findOneAndUpdate({ _id: params.id }, body, { new: true })
             .then(dbUserData => {
               if (!dbUserData) {
                 res.status(404).json({ message: 'No user found with this id!' });
                 return;
               }
               res.json(dbUserData);
             })
             .catch(err => res.status(400).json(err));
         },
   // delete User by id
           deleteUser({ params, body }, res) {
           User.findOneAndDelete({ _id: params.id })
           .then(dbUserData => {
               if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
           }
               res.json(dbUserData);
         })
           .catch(err => res.status(400).json(err));
     },

    //  add Friend
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
          { _id: params.id },
          { $push: { friends: params.friendId } },
          { new: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

    //   remove friend
    removeFriend({ params }, res) {
        User.findByIdAndUpdate(
          { _id: params.id },
          { $pull: { friends: params.friendId } },
          { new: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
    }

module.exports = userController;