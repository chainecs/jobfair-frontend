/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../libs/api";

export async function userLogIn(email: string, password: string) {
  try {
    const response = await api.post("/api/v1/auth/login", { email, password });
    console.log("Login successful:", response.data);
    api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
    console.log(api.defaults.headers.common["Authorization"]);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    if ((error as any).response?.data?.message) {
      throw new Error((error as any).response.data.message);
    }
    throw error;
  }
}

export async function userLogOut() {
  try {
    const response = await api.get("/api/v1/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error("Logout failed");
  }
}

export async function getMe(token: string) {
  try {
    const response = await api.get("/api/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Get me failed:", error);
    throw new Error("Get me failed");
  }
}
