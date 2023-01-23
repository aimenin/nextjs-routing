import { NextApiRequest, NextApiResponse } from 'next';
import { connectToNewsletter } from '../../../api/mongo';
import { ApiSenderComment } from '../../../types/apiTypes';

interface EventNextApiRequest extends NextApiRequest {
  body: ApiSenderComment;
}

const handler = async (req: EventNextApiRequest, res: NextApiResponse) => {
  const eventId = req.query.eventId;

  const { client, db } = await connectToNewsletter();

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(322).json({ message: 'Invalid input' });
      return;
    }

    console.log(email, name, text);

    const newComment = {
      email,
      text,
      name,
      eventId,
    };

    const result = await db.collection('comments').insertOne(newComment);

    res.status(201).json({
      message: 'Added comment.',
      comment: {
        ...newComment,
        id: result.insertedId,
      },
    });
  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: 'Max', email: 'test@test.com', text: 'yyy' },
      { id: 'c2', name: 'Artem', email: 'test2@test2.com', text: 'yyy2' },
    ];
    res.status(200).json({ message: 'List of comments', comments: dummyList });
  }

  client.close();
};

export default handler;
