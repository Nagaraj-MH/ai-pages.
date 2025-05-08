import React, { createContext, useContext, useState } from "react";
import { login } from "../services/authApi";

interface AuthContextType {
  user: string | null;
  token: string | null;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const loginUser = async (email: string, password: string) => {
    const data = await login(email, password);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser(email);
      setToken(data.token);
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
