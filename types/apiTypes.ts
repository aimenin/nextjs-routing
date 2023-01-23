export type ApiComment = {
  id: string;
  email: string;
  name: string;
  text: string;
};

export type ApiSenderComment = Omit<ApiComment, 'id'>;
