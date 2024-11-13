export interface IUser {
  _id: string;
  token: string;
  name: string;
  email: string;
  tel?: string;
  role?: "user" | "admin";
  createdAt?: Date;
}
