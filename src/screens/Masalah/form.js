import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as Yup from 'yup';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import SelectInput from '../../components/SelectInput';
import TextInput from '../../components/TextInput';

/* eslint-disable no-nested-ternary */
/* eslint-disable radix */

export default function Form({
  next,
  setSelectedImg,
  step,
  isLoading,
  onUpdate,
  selectedImg,
  setValues,
  handleAdd,
  item,
}) {
  const editAble = (item?.masalahCode && true) || false;
  const [isNext, setIsNext] = useState({ a: '', s: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (val) => {
    setValues(val);
    next(isNext.a, isNext.s);
  };
  const formik = useFormik({
    initialValues: {
      jenisMasalah: item ? item.jenisMasalah : '',
      deskripsi: item ? item.deskripsi : '',
    },
    validationSchema: Yup.object({
      jenisMasalah: Yup.string().required('Harus Disisi'),
      deskripsi: Yup.string().required('Harus Disisi'),
    }),
    onSubmit: handleSubmit,
  });

  const handleOpen = (a, s) => {
    setLoading(true);
    setIsNext({ a, s });
    formik.submitForm();
    setLoading(false);
  };
  const handleUploadClick = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImg(reader.result);
    };
    setLoading(false);
  };
  const removeImg = () => {
    setSelectedImg(null);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {step === 0 && (
        <>
          <SelectInput
            label="Jenis Masalah"
            name="jenisMasalah"
            id="jenisMasalah"
            value={formik.values.jenisMasalah}
            error={formik.touched.jenisMasalah && Boolean(formik.errors.jenisMasalah)}
            onChange={formik.handleChange}
            option={[
              'Kerusakan Mesin',
              'Kerusakan Kendaraan',
              'Kerusakan Peralatan',
              'Masalah Ketenagakerjaan',
              'Masalah Suplay',
              'Kondisi Darurat',
            ].map((a) => {
              return { value: a, label: a };
            })}
          />
          <TextInput
            name="deskripsi"
            id="deskripsi"
            value={formik.values.deskripsi}
            onChange={formik.handleChange}
            error={formik.touched.deskripsi && Boolean(formik.errors.deskripsi)}
            helperText={formik.touched.deskripsi && formik.errors.deskripsi}
            multiline
            rows={3}
            label={'Dekskripsikan Masalah'}
          />
          <ButtonPrimary
            onClick={() => handleOpen('Unggah Foto', 1)}
            style={{ marginTop: 30, marginBottom: 5 }}
            label={'Selanjutnya'}
          />
        </>
      )}
      {step === 1 && (
        <>
          <div style={{ paddingLeft: 40, paddingRight: 40, marginBottom: 20 }}>
            {selectedImg && (
              <a style={{ width: '100%' }} role="button" tabIndex={0} onKeyDown={removeImg} onClick={removeImg}>
                <img style={{ margin: 10 }} src={selectedImg} alt={`img-nota`} />
              </a>
            )}
            <ButtonPrimary disabled={selectedImg} upload={handleUploadClick} component="label" label="Unggah File" />
          </div>
          <ButtonPrimary
            disabled={selectedImg === null || loading || isLoading}
            onClick={editAble ? onUpdate : handleAdd}
            style={{ marginTop: 30, marginBottom: 5 }}
            label={editAble ? 'Update' : 'Tambah'}
          />
        </>
      )}
    </form>
  );
}

Form.propTypes = {
  next: PropTypes.any,
  setSelectedImg: PropTypes.any,
  step: PropTypes.any,
  isLoading: PropTypes.any,
  item: PropTypes.any,
  onUpdate: PropTypes.func,
  selectedImg: PropTypes.any,
  setValues: PropTypes.any,
  handleAdd: PropTypes.func,
};
