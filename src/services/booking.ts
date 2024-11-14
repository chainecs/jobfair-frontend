"use server";

import api from "@/libs/api";
import { IBooking } from "@/@types/IBooking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

// Helper function to get authorization headers
const getAuthHeaders = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  if (!token) {
    throw new Error("No access token available");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

// Fetch all bookings
export const fetchBookings = async (): Promise<IBooking[]> => {
  try {
    const headers = await getAuthHeaders();
    const response = await api.get("/api/v1/bookings", { headers });

    if (response.status === 200 && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    throw new Error("Failed to fetch bookings");
  } catch (error) {
    console.error("Error in fetchBookings:", error);
    throw error;
  }
};

// Create a new booking
export const createBooking = async (formData: Partial<IBooking>): Promise<IBooking> => {
  try {
    const headers = await getAuthHeaders();
    const response = await api.post("/api/v1/bookings", formData, { headers });

    if (response.status === 201) {
      return response.data;
    }
    throw new Error("Failed to create booking");
  } catch (error) {
    console.error("Error in createBooking:", error);
    throw error;
  }
};

// Update an existing booking
export const updateBooking = async (id: string, formData: Partial<IBooking>): Promise<IBooking> => {
  try {
    const headers = await getAuthHeaders();
    const response = await api.put(`/api/v1/bookings/${id}`, formData, { headers });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to update booking");
  } catch (error) {
    console.error("Error in updateBooking:", error);
    throw error;
  }
};

// Delete a booking
export const deleteBooking = async (id: string): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    const response = await api.delete(`/api/v1/bookings/${id}`, { headers });

    if (response.status !== 200) {
      throw new Error("Failed to delete booking");
    }
  } catch (error) {
    console.error("Error in deleteBooking:", error);
    throw error;
  }
};
