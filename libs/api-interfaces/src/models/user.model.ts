export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserResponse extends User {
  token: string;
}

export interface CreateUser {
  username: string;
  email: string;
  password: string;
}
export interface LoginUser {
  email: string;
  password: string;
}
export interface UpdateUser {
  username: string;
  email: string;
}
