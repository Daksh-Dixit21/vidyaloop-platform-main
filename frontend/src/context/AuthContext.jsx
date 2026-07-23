import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('vidyaloop_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      authAPI.getMe()
        .then(res => {
          setUser(res.data);
          localStorage.setItem('vidyaloop_user', JSON.stringify(res.data));
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (identifier, password, isAdmin = false) => {
    const res = isAdmin
      ? await authAPI.adminLogin(identifier, password)
      : await authAPI.login(identifier, password);

    const { token: newToken, user: userData } = res.data;
    localStorage.setItem('vidyaloop_token', newToken);
    localStorage.setItem('vidyaloop_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('vidyaloop_token');
    localStorage.removeItem('vidyaloop_user');
    setToken(null);
    setUser(null);
  };

  const changePassword = async (currentPassword, newPassword) => {
    await authAPI.changePassword(currentPassword, newPassword);
    const updated = { ...user, first_login: false };
    setUser(updated);
    localStorage.setItem('vidyaloop_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
