import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import TextInput from '../../components/TextInput';
import axios from '../../api';

const LOGIN_URL = '/login';

export default function Masuk() {
  const { setAuth, updateAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/mobile';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ email: user, password: pwd }), {
        headers: { 'Content-Type': 'application/json' },
      });
      const accessToken = response?.data?.data.accessToken;
      const refreshToken = response?.data?.data.refreshToken;
      // const roles = null;
      await localStorage.setItem('accessToken', accessToken);
      await localStorage.setItem('refreshToken', refreshToken);

      setAuth({ accessToken });
      setUser('');
      setPwd('');
      updateAuth();
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
    setLoading(false);
  };
  return (
    <>
      <Typography color="red" ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="email"
          name="email"
          type="email"
          ref={userRef}
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          label={'E-mail'}
        />
        <TextInput
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          label={'Password'}
        />
        <ButtonPrimary disabled={loading} type="submit" label="Masuk" />
      </form>
    </>
  );
}
