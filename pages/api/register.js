import nc from 'next-connect';
import User, { findOne } from '../../models/user';
import db from '../../utils/db';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handler = nc();

export default handler.post(async (req, res) => {
  const { name, email, password } = req.body;
  const salt = 10;
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    await db.connect();
    const isUser = await User.findOne({ email });
    console.log('isUser', isUser);
    if (!isUser) {
      const newUser = await new User({ name, email, password: hashPassword });
      const user = await newUser.save();
      const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
      res.send({ id: user._id, name: user.name, email: user.email, token });
    } else {
      res.send('Email id already exist');
    }
    await db.disconnect();
  } catch (error) {
    res.send('something went wrong');
  }
});
