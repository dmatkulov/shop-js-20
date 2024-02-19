import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import auth, { RequestWithUser } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();

    return res.send({ message: 'OK!', user });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    console.log(e);
    next(e);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(422).send({ error: 'Username not found' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'Password is wrong' });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Username and password are correct', user });
  } catch (e) {
    next(e);
  }
});

userRouter.get('/secret', auth, async (req: RequestWithUser, res, next) => {
  try {
    const name = req.user?.username;

    return res.send({
      message: 'This is a secret message!',
      username: name,
    });
  } catch (e) {
    next(e);
  }
});

export default userRouter;
