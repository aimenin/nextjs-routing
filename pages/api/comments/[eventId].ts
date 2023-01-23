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

    try {
      const result = await db.collection('comments').insertOne(newComment);

      res.status(201).json({
        message: 'Added comment.',
        comment: {
          ...newComment,
          id: result.insertedId,
        },
      });
    } catch (e) {
      res.status(500).json({
        message: 'There is an error while adding comment',
        comment: {},
      });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await db
        .collection('comments')
        .find({ eventId: eventId })
        .sort({
          _id: -1,
        })
        .toArray();

      res
        .status(200)
        .json({ message: 'List of comments', comments: documents });
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Impossible get any comments', comments: [] });
    }
  }

  client.close();
};

export default handler;
