import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean,
  login: (token: string) => void,
  logout: () => void,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsAuthenticated(true)
    }

  }, [])

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  }

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  }

  return (

    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {

  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um Auth Provider")
  }
  return context;
}

