import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  async function findUserByUsername(usuario: string) {
    return users.find((user) => user.username === usuario);
  }

  async function validateUser() {
    const user = await findUserByUsername(username);
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      return true;
    }
    return false;
  }

  function generateSessionId(): string {
    return uuidv4();
  }

function saveSession (sessionId: string, usuario: string) {
    const session = {
      id: sessionId,
      username: usuario,
    };
    sessions.push(session);
  }
  
  async function createSession(usuario: string) {
    const sessionId = await generateSessionId();
    await saveSession(sessionId, usuario);
    return sessionId;
  }

  const validUser = await validateUser();

  if (validUser) {
    const sessionId = await createSession(username);
    res.setHeader('Set-Cookie', `sessionId=${sessionId}; path=/; HttpOnly; Secure; SameSite=Strict;`);
    res.status(200).json({ message: 'inicio de sesión exitoso' });
  } else {
    res.status(401).json({ message: 'credenciales inválidas' });
  }
}
