import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (user) => {
    return new Promise((resolve) => {
      setCurrentUser(user);
      resolve();
    });
  };

  const logout = () => {
    return new Promise((resolve) => {
      setCurrentUser(null);
      resolve();
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
