import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { setAuth, updateAuth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from?.pathname || '/dashboard';

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(6).required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (val) => {
      const { email, password } = val;
      setLoading(true);
      try {
        const response = await axios.post('/login', JSON.stringify({ email, password }), {
          headers: { 'Content-Type': 'application/json' },
        });
        const accessToken = response?.data?.data.accessToken;
        const refreshToken = response?.data?.data.refreshToken;
        await localStorage.setItem('accessToken', accessToken);
        await localStorage.setItem('refreshToken', refreshToken);
        setAuth({ accessToken });
        updateAuth();
        navigate(from, { replace: true });
      } catch (err) {
        if (!err?.response) {
          enqueueSnackbar('No Server Response', { variant: 'warning' });
        } else if (err.response?.status === 400) {
          enqueueSnackbar('Missing Username or Password', { variant: 'warning' });
        } else if (err.response?.status === 401) {
          enqueueSnackbar('Unauthorized', { variant: 'warning' });
        } else {
          enqueueSnackbar('Login Failed', { variant: 'warning' });
        }
      }
      setLoading(false);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, handleChange } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            name="email"
            onChange={handleChange}
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            name="password"
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting || loading}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
