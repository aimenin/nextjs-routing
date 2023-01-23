import { MongoClient, Db } from 'mongodb';

export const connectToNewsletter = async (): Promise<{
  client: MongoClient;
  db: Db;
}> => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.bllf1q7.mongodb.net/newsletter?retryWrites=true&w=majority`
  );
  const db = client.db();
  return {
    client,
    db,
  };
};
