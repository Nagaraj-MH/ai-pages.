import User from "../Models/User"; 
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth";
export const signup = async (
  email: string,
  password: string,
  name: string,
  username: string
) => {
  try {
    console.log({ email, password, name });
    const response = await axios.post(
      `${API_URL}/signup`,
      { email, password, name, username },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response?.data || { error: "Signup failed" };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Login failed" };
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, {
      token,
      new_password: newPassword,
    });
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Reset password failed" };
  }
};
export const checkUsernameAvailability = async (
  username: string
): Promise<{ available: boolean }> => {
  if (!username || username.length < 3) {
    return { available: false };
  }
  try {
    const response = await axios.get(`${API_URL}/check-username`, {
      params: { username },
    });
    return response.data;
  } catch (error) {
    console.error("Error checking username availability:", error);
    return { available: false };
  }
};

export const getAccountDetails = async (token: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/getme`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch account details:", error);
    throw error.response?.data || new Error("Could not fetch account details");
  }
};
