import { ICompany } from "./ICompany";

export interface IBooking {
  _id?: string;
  bookingDate: Date;
  user?: string;
  company: ICompany | null; // Change this to an object
  createdAt?: Date;
}
