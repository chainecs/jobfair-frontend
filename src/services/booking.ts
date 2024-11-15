/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import api from "@/libs/api";
import { IBooking } from "@/@types/IBooking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

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

export const fetchBookings = async (): Promise<IBooking[]> => {
  try {
    const headers = await getAuthHeaders();
    const response = await api.get("/api/v1/bookings", { headers });
    return response.data.data;
  } catch (error) {
    console.error("Error in fetchBookings:", error);
    throw error;
  }
};

export const createBooking = async (companyId: string, bookingData: Partial<IBooking>): Promise<IBooking> => {
  try {
    const headers = await getAuthHeaders();
    const response = await api.post(`/api/v1/companies/${companyId}/bookings`, bookingData, { headers });

    return response.data;
  } catch (error) {
    console.error("Error in createBooking:", error);
    if ((error as any).response?.data?.message) {
      throw new Error((error as any).response.data.message);
    }
    throw error;
  }
};

export const updateBooking = async (id: string, formData: Partial<IBooking>): Promise<IBooking> => {
  try {
    const headers = await getAuthHeaders();
    const response = await api.put(`/api/v1/bookings/${id}`, formData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error in updateBooking:", error);
    if ((error as any).response?.data?.message) {
      throw new Error((error as any).response.data.message);
    }
    throw error;
  }
};

export const deleteBooking = async (id: string): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/api/v1/bookings/${id}`, { headers });
  } catch (error) {
    console.error("Error in deleteBooking:", error);
    throw error;
  }
};
