import nc from 'next-connect';
import db from '../../utils/db';
import User from '../../models/user';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handler = nc();

export default handler.post(async (req, res) => {
  const { email, password } = req.body;

  try {
    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();
    if (!user) {
      res.send('Email id is not register yet');
    } else {
      const isPasswordMatching = bcrypt.compareSync(password, user.password);
      if (isPasswordMatching == true) {
        const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
        res.send({
          id: user._id,
          name: user.name,
          email: user.email,
          token,
        });
      } else {
        res.send('Password is wrong');
      }
    }
  } catch (error) {
    console.log('error', error);
    res.send('something went wrong');
  }
});
