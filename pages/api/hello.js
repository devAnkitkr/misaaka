import nc from 'next-connect';
import db from '../../utils/db';

const handler = nc();

export default handler.get(async (req, res) => {
  await db.connect();
  await db.disconnect();
  res.status(200).json({ name: 'misaaka' });
});
