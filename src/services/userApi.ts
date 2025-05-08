import axios from "axios";
import User from "../Models/User";
import config from "../config";

export const getAccountDetails = async (token: string): Promise<User> => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/user/getme`, {
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
  
  export const uploadProfileImageAPI = async (
    file: File,
    token: string
  ): Promise<{ profileImageUrl: string }> => {
    const formData = new FormData();
    formData.append("profilePicture", file); 
  
    
    const response = await fetch(
      `${config.apiBaseUrl}/user/upload-profile`,
      {
        
        method: "POST",
        headers: {
          
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Upload failed with no error details" }));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  };
  