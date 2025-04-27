import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth"; // Change this to your backend URL

export const signup = async (email: string, password: string, name: string) => {
  try {
    console.log({ email, password, name });
    const response = await axios.post(
      `${API_URL}/signup`,
      { email, password, name },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // ✅ Ensures cookies and credentials are sent
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
