/* eslint-disable import/no-extraneous-dependencies */
import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default function profileHandler(req: NextApiRequest, res: NextApiResponse) {
  interface userPayload {
    documento: string;
    username: string;
  }
  const { myTokenName } = req.cookies;
  if (!myTokenName) {
    return res.status(401).json({ error: 'NO token' });
  }

  try {
    const user = verify(myTokenName, 'secret') as userPayload;
    return res.json({ documento: user.documento, username: user.username });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
