export type DateFilter = {
  year: number;
  month: number;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};
