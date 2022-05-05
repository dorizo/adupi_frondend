import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import TextInput from '../../components/TextInput';

export default function Masuk() {
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
      email: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        autoFocus
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        label={'E-mail'}
      />
      <TextInput
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        autoFocus
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        label={'Password'}
      />
      <ButtonPrimary type="submit" label="Masuk" />
    </form>
  );
}
