import { NextApiHandler } from 'next';

import crypto from 'crypto';

const user = {
  id: 1,
  username: 'exampleuser',
  email: 'exampleuser@example.com'
};

const token = crypto.createHash('md5').update(String(user)).digest('hex');

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (username === 'exampleuser' && password === '123123abc') {
      // Check if the provided username matches the hardcoded example user
      if (username === user.username) {
        // Send token and user as response
        res.status(200).json({ token, user });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
