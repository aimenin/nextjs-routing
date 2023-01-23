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

    // const client = await MongoClient.connect(
    //   `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.bllf1q7.mongodb.net/newsletter?retryWrites=true&w=majority`
    // );
    // const db = client.db();

    const { client, db } = await connectToNewsletter();

    await db.collection('newsletter').insertOne({
      email: userEmail,
    });

    client.close();

    res.status(201).json({ message: 'Successfully subscribed' });
  }
};

export default handler;
