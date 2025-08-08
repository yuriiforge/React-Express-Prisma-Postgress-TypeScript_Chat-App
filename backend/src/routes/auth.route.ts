import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
  res.send('Logged in successfully');
});

router.get('/logout', (req, res) => {
  res.send('Logged out successfullt');
});

router.get('/signup', (req, res) => {
  res.send('Signed up successfully');
});

export default router;
