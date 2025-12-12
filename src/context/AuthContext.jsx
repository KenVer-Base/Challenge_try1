import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Ambil data user dari localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // =========================
  // LOGIN (pakai user + token)
  // =========================
  const login = (userData, tokenData) => {
    if (!userData) return false;

    setUser(userData);
    setToken(tokenData || null);

    localStorage.setItem("user", JSON.stringify(userData));

    if (tokenData) {
      localStorage.setItem("token", tokenData);
    }

    return true;
  };

  // =========================
  // REGISTER (hanya simpan user lokal)
  //   - API sudah di handle di Register.jsx
  // =========================
  const register = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
