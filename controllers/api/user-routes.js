const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all users (excluding passwords)
router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(dbUserData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to get a single user by ID with associated posts and comments
router.get('/:id', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_text', 'created_at']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at']
        }
      ]
    });

    if (!dbUserData) {
      res.status(404).json({ message: 'No User found with this id' });
      return;
    }

    res.json(dbUserData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!dbUserData) {
      res.status(400).json({ message: 'Username not Found' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect Password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to log out a user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Route to update a user by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    });

    if (!updatedUser[0]) {
      res.status(404).json({ message: 'No User found with this id' });
      return;
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to delete a user by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedUser) {
      res.status(404).json({ message: 'No User found with this id' });
      return;
    }

    res.json(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;