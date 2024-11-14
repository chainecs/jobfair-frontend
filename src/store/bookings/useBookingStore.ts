// useBookingStore.ts
import { create } from "zustand";
import { createBooking, fetchBookings, updateBooking, deleteBooking } from "@/services/booking";
import { IBooking } from "@/@types/IBooking";

// Define the initial state structure
interface IBookingState {
  bookings: IBooking[];
  selectedBooking: IBooking | null;
}

// Define action types
interface IBookingActions {
  setBookings: (bookings: IBooking[]) => void;
  setSelectedBooking: (booking: IBooking | null) => void;
}

// Define action request types
interface IBookingActionRequest {
  listBookings: () => Promise<IBooking[]>;
  createBooking: (formData: Partial<IBooking>) => Promise<IBooking>;
  updateBooking: (id: string, formData: Partial<IBooking>) => Promise<IBooking>;
  deleteBooking: (id: string) => Promise<void>;
}

// Combine everything into a single store type
type IBookingStore = IBookingState & IBookingActions & IBookingActionRequest;

// Initial state values
const initState: IBookingState = {
  bookings: [],
  selectedBooking: null,
};

// Define the Zustand store
export const useBookingStore = create<IBookingStore>((set) => ({
  // Initial state
  ...initState,

  // Actions to manipulate the state
  setBookings: (bookings) => set({ bookings }),
  setSelectedBooking: (booking) => set({ selectedBooking: booking }),

  // Async actions to interact with the backend
  listBookings: async () => {
    const data = await fetchBookings();
    set({ bookings: data });
    return data;
  },

  createBooking: async (formData) => {
    const newBooking = await createBooking(formData);
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
