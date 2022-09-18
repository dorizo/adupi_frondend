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
  gudang,
  setSelectedImg,
  step,
  onUpdate,
  selectedImg,
  setValues,
  isLoading,
  handleAdd,
  item,
  prosessinput
}) {
  const editAble = (item?.mesinCode && true) || false;
  const [isNext, setIsNext] = useState({ a: '', s: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (val) => {
    setValues(val);
    next(isNext.a, isNext.s);
  };
  const formik = useFormik({
    initialValues: {
      statusKepemilikanMesin: item ? item.statusKepemilikanMesin : '',
      jenisMesin: item ? item.jenisMesin : '',
      kapasitas: item ? item.kapasitas : '',
      usahaCode: item ? item.usahaCode : gudang[0]?.value,
    },
    validationSchema: Yup.object({
      statusKepemilikanMesin: Yup.string().required('Harus Disisi'),
      jenisMesin: Yup.string().required('Harus Disisi'),
      usahaCode: Yup.string().required('Harus Disisi'),
      kapasitas: Yup.number().required('Harus Disisi'),
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
            label={'Usaha'}
            name="usahaCode"
            id="usahaCode"
            value={formik.values.usahaCode}
            onChange={formik.handleChange}
            error={formik.touched.usahaCode && Boolean(formik.errors.usahaCode)}
            option={gudang}
            pilih={false}
          />
          <SelectInput
            label={'Status Kepemilikan'}
            name="statusKepemilikanMesin"
            id="statusKepemilikanMesin"
            value={formik.values.statusKepemilikanMesin}
            onChange={formik.handleChange}
            error={formik.touched.statusKepemilikanMesin && Boolean(formik.errors.statusKepemilikanMesin)}
            option={[{ value: 'Milik Sendiri', label: 'Milik Sendiri' } ,{ value: 'Program GESN', label: 'Program GESN' } ,{ value: 'Sewa', label: 'Sewa' } ,{ value: 'Hak Pakai', label: 'Hak Pakai' }]}
          />
          <SelectInput
            label="Jenis Mesin"
            name="jenisMesin"
            id="jenisMesin"
            value={formik.values.jenisMesin}
            onChange={formik.handleChange}
            error={formik.touched.jenisMesin && Boolean(formik.errors.jenisMesin)}
            option={[{ value: 'Mesin Press', label: 'Mesin Press' },{ value: 'conveyor belt', label: 'Conveyor Belt' },{ value: 'Mesin Cacah', label: 'Mesin Cacah' },{ value: 'Mesin Pengering', label: 'Mesin Pengering' },{ value: 'Mesin kupas label', label: 'Mesin kupas label' }]}
          />
          <TextInput
            id="kapasitas"
            name="kapasitas"
            type="number"
            value={formik.values.kapasitas}
            onChange={formik.handleChange}
            error={formik.touched.kapasitas && Boolean(formik.errors.kapasitas)}
            helperText={formik.touched.kapasitas && formik.errors.kapasitas}
            label={'Kapasitas'}
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
            label={prosessinput===0?editAble ? 'Update' : 'Tambah':prosessinput}
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
  item: PropTypes.any,
  onUpdate: PropTypes.func,
  selectedImg: PropTypes.any,
  setValues: PropTypes.any,
  isLoading: PropTypes.any,
  gudang: PropTypes.any,
  handleAdd: PropTypes.func,
};
