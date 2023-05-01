export interface User {
  id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
}

export interface LoginDTO {
  id: number;
  username: string;
  password: string;
  email: string;
}

export interface RegisterDTO {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
}
