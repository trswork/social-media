const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
  } = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thought
router.route('/')
  .get(getAllThought);

router.route('/:userId')
  .post(addThought);

// Set up GET one, PUT, and DELETE at /api/thought/:id
router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Create a PUT and DELETE at /api/thoughts/:userId/:thoughtId
router.route('/:userId/:thoughtId')
  .put(addReaction)
  .delete(deleteReaction)

module.exports = router;