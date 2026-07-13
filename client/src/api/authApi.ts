import axios from "axios";

const API_URL = "http://localhost:5238/api/auth";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  name: string;
  email: string;
  role: string;
  token: string;
  expiresAt: string;
}

export const loginUser = async (
  data: LoginRequest
): Promise<LoginResponse> => {

  const response = await axios.post<LoginResponse>(
    `${API_URL}/login`,
    data
  );

  return response.data;
};