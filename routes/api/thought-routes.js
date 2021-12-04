const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
  } = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thought
router.route('/')
  .get(getAllThoughts);

router.route('/:userId')
  .post(addThought);

// Set up GET one, PUT, and DELETE at /api/thought/:id
router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;