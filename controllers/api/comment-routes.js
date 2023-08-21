const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to retrieve all comments
router.get('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll();
    res.json(dbCommentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to create a new comment (requires authentication)
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});
// Route to delete a comment by ID
router.delete('/:id', async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    res.json(dbCommentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;