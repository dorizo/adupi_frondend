/* eslint-disable no-unneeded-ternary */
/* eslint-disable prefer-const */
import { useNavigate } from 'react-router-dom';
import { set } from 'lodash';
import { createContext, useEffect, useState } from 'react';
import LoadingPage from '../components/Loading';
import axios from '../api';

const AuthContext = createContext({});

const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: localStorage.getItem('accessToken') ? true : false,
  permission: [],
  role: [],
  user: null,
};
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const [l, setL] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    await setAuth(initialState);
    await localStorage.removeItem('accessToken');
    await localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  async function updateAuth() {
    setL(true);
    const accessToken = await localStorage.getItem('accessToken');
    if (accessToken || auth.accessToken) {
      try {
        const response = await axios.get('account/self', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        let permission = [];
        const role =
          response.data &&
          response.data.data.role.map((r) => {
            r.permission.forEach((p) => permission.push(p.permission));
            return r.role;
          });
        const user = response.data.data.email;
        response.data.data.specialPermission.forEach((p) => {
          permission.push(p.permission);
        });
        await setAuth({
          role,
          permission,
          user,
          accessToken,
          isAuthenticated: localStorage.getItem('accessToken') ? true : false,
        });
      } catch (err) {
        await setAuth(initialState);
        if (!err?.response) {
          console.log('No Server Response');
        } else if (err.response?.status === 400) {
          console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
          console.log('Unauthorized');
        } else {
          console.log('Login Failed');
        }
      }
    } else {
      await setAuth(initialState);
    }
    setL(false);
  }

  useEffect(() => {
    updateAuth();
  }, []);
  if ((localStorage.getItem('accessToken') && auth.user === null) || l) {
    return <LoadingPage />;
  }
  console.log(auth);
  return <AuthContext.Provider value={{ auth, setAuth, logout, updateAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
