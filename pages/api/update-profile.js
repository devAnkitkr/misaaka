import nc from 'next-connect';
import User from '../../models/user';
import db from '../../utils/db';
import isAuth from '../../utils/isAuth';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handler = nc();

handler.use(isAuth);

export default handler.put(async (req, res) => {
  try {
    await db.connect();
    const user = await User.findById(req.body.id);
    if (!user) {
      res.send("User doesn't exist");
    }
    user.name = req.body.name;
    user.email = req.body.email;
    const salt = 10;
    user.password = bcrypt.hashSync(req.body.password, salt);
    await user.save();
    await db.disconnect();
    const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
    res.send({ id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    console.log('error', error);
    res.send('something went wrong please try again later');
  }
});
