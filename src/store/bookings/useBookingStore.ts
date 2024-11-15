import { create } from "zustand";
import { IBooking } from "@/@types/IBooking";
import { fetchBookings, createBooking as serverCreateBooking, updateBooking, deleteBooking } from "@/services/booking";

interface IBookingState {
  bookings: IBooking[];
  selectedBooking: IBooking | null;
}

interface IBookingActions {
  setBookings: (bookings: IBooking[]) => void;
  setSelectedBooking: (booking: IBooking | null) => void;
}

interface IBookingActionRequest {
  listBookings: () => Promise<IBooking[]>;
  createBooking: (companyId: string, bookingData: Partial<IBooking>) => Promise<IBooking>;
  updateBooking: (id: string, formData: Partial<IBooking>) => Promise<IBooking>;
  deleteBooking: (id: string) => Promise<void>;
}

type IBookingStore = IBookingState & IBookingActions & IBookingActionRequest;

const initState: IBookingState = {
  bookings: [],
  selectedBooking: null,
};

export const useBookingStore = create<IBookingStore>((set) => ({
  ...initState,
  setBookings: (bookings) => set({ bookings }),
  setSelectedBooking: (booking) => set({ selectedBooking: booking }),
  listBookings: async () => {
    const data = await fetchBookings();
    set({ bookings: data });
    return data;
  },

  createBooking: async (companyId, bookingData) => {
    const newBooking = await serverCreateBooking(companyId, bookingData);
    set((state) => ({ bookings: [...state.bookings, newBooking] }));
    return newBooking;
  },

  updateBooking: async (id, formData) => {
    const updatedBooking = await updateBooking(id, formData);
    set((state) => ({
      bookings: state.bookings.map((booking) => (booking._id === id ? updatedBooking : booking)),
    }));
    return updatedBooking;
  },

  deleteBooking: async (id) => {
    await deleteBooking(id);
    set((state) => ({
      bookings: state.bookings.filter((booking) => booking._id !== id),
    }));
  },
}));
