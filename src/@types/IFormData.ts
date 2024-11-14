import { ICompany } from "./ICompany";

export interface IFromData {
  bookingDate: Date;
  company: ICompany | null;
}
