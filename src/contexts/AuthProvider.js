/* eslint-disable no-unneeded-ternary */
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: localStorage.getItem('token') ? true : false,
};
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const logout = async () => {
    await setAuth({});
    await localStorage.removeItem('accessToken');
    await localStorage.removeItem('refreshToken');
  };

  useEffect(() => {
    async function updateAuth() {
      const accessToken = await localStorage.getItem('accessToken');
      if (accessToken) {
        await setAuth({ accessToken, isAuthenticated: localStorage.getItem('token') ? true : false });
      } else {
        await setAuth({});
      }
    }
    updateAuth();
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
