// Updated IBooking Interface
export interface ICompany {
  _id: string;
  name: string;
  address: string;
  tel: string;
}

export interface IBooking {
  _id?: string;
  bookingDate: Date;
  user?: string;
  company: ICompany; // Change this to an object
  createdAt?: Date;
}
