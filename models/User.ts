export type User = {
  _id: string;
  id?: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  onboarded?: boolean;
  communities?: {
    name: string;
    username: string;
    image: string;
    _id: string;
  };
};
