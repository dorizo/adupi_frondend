import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as Yup from 'yup';
import ButtonPrimary from '../../../components/Button/ButtonPrimary';
import TextInput from '../../../components/TextInput';

export default function Step6({ handleNext, isLoading }) {
  const formik = useFormik({
    initialValues: {
      password: '',
      password2: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required('This field is required'),
      password2: Yup.string().when('password', {
        is: (val) => (val && val.length && true) || false,
        then: Yup.string().oneOf([Yup.ref('password')], 'Both password need to be the same'),
      }),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleNext(0, 'Done', { password: values.password });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        label={'Atur Password Anda'}
      />
      <TextInput
        id="password2"
        name="password2"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password2}
        error={formik.touched.password2 && Boolean(formik.errors.password2)}
        helperText={formik.touched.password2 && formik.errors.password2}
        label={'Masukkan Lagi Password'}
      />
      <ButtonPrimary disabled={isLoading} type="submit" label="Daftar" />
    </form>
  );
}

Step6.propTypes = {
  handleNext: PropTypes.func,
  isLoading: PropTypes.any,
};
