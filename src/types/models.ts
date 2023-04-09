export interface User {
  id: string;
  username: string;
  email: string;
}

export type Errors = {
  [key: string]: string;
};
