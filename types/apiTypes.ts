export type ApiComment = {
  _id: string;
  email: string;
  name: string;
  text: string;
};

export type ApiSenderComment = Omit<ApiComment, 'id'>;
