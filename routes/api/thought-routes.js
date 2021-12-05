const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
  } = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thought
router.route('/')
  .get(getAllThought)
  .post(createThought);



// Set up GET one, PUT, and DELETE at /api/thought/:id
router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);
  

// Create a PUT :userId/reactions
router.route('/:id/reactions')
.post(createReaction);

router.route('/:thoughtId/reactions/')
  .delete(removeReaction);

module.exports = router;