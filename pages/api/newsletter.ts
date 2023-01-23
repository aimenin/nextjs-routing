import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { connectToNewsletter } from '../../api/mongo';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const userEmail: string = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    try {
      const { client, db } = await connectToNewsletter();

      await db.collection('newsletter').insertOne({
        email: userEmail,
      });

      client.close();
    } catch (e) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    res.status(201).json({ message: 'Successfully subscribed' });
  }
};

export default handler;
