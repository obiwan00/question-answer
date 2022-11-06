
export interface UserResponse {
  id: number;
  username: string;
  email: string;
}

export interface UserAuthResponse extends UserResponse {
  token: string;
}

export type AuthenticatedUser = UserAuthResponse

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
