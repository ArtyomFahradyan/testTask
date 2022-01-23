export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
};

export type Account = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  password: string;
  confirm: string;
};
