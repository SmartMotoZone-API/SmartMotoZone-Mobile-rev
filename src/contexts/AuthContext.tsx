import React, { createContext, useContext, useState } from "react";
import api from "../services/api.";

interface AuthContextType {
  user: any;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  register: (email: string, senha: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, senha: string) => {
    const res = await api.post("/auth/login", { email, senha });
    setUser(res.data);
  };

  const register = async (email: string, senha: string) => {
    await api.post("/auth/register", { email, senha });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
