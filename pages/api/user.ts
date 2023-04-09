import { NextApiHandler } from 'next';

const token = '1441a7909c087dbbe7ce59881b9df8b9';

const user = {
  id: 1,
  username: 'exampleuser',
  email: 'exampleuser@example.com',
};

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'POST') {
    const { token: userToken } = req.body;

    if (userToken && userToken.replace(/['"]+/g, '') === token.replace(/['"]+/g, '')) {
      res.status(200).json({ ...user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
