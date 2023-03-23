/* eslint-disable import/no-extraneous-dependencies */
import { verify } from 'jsonwebtoken';

export default function profileHandler(req, res) {
  const { myTokenName } = req.cookies;
  if (!myTokenName) {
    return res.status(401).json({ error: 'NO token' });
  }

  try {
    const user = verify(myTokenName, 'secret');
    return res.json({ documento: user.documento, username: user.username });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
