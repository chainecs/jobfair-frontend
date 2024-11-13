import axiosInstance from "./axiosInstance";

export async function userLogIn(email: string, password: string) {
  try {
    const response = await axiosInstance.post("/api/v1/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed");
  }
}

export async function userLogOut() {
  try {
    const response = await axiosInstance.get("/api/v1/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error("Logout failed");
  }
}

export async function getMe(token: string) {
  try {
    const response = await axiosInstance.get("/api/v1/auth/me", {
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
