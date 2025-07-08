import axios from "axios";
import config from "../config";

export const handleLike = async (id: string, token: string): Promise<void> => {
  console.log({ id, token });
  try {
    const response = await axios.post(
      `${config.apiBaseUrl}/books/${id}/like`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch account details:", error);
    throw error.response?.data || new Error("Could not fetch account details");
  }
};
export const handleUnlike = async (
  id: string,
  token: string
): Promise<void> => {
  console.log({ id, token });
  try {
    const response = await axios.post(
      `${config.apiBaseUrl}/books/${id}/like`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch account details:", error);
    throw error.response?.data || new Error("Could not fetch account details");
  }
};
