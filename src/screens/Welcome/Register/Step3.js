import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as Yup from 'yup';
import ButtonPrimary from '../../../components/Button/ButtonPrimary';
import SelectInput from '../../../components/SelectInput';
import TextInput from '../../../components/TextInput';

export default function Step3({ handleNext, values }) {
  const formik = useFormik({
    initialValues: {
      namaUsaha: values?.namaUsaha || '',
      noSuratIzinUsaha: values?.noSuratIzinUsaha || '',
      luasGudang: values?.luasGudang || 0,
      lamaOperasional: values?.lamaOperasional || 0,
      jumlahPekerja: values?.jumlahPekerja || 0,
      statusKepemilikanGudang: values?.statusKepemilikanGudang || '',
    },
    validationSchema: Yup.object({
      namaUsaha: Yup.string().required('Harus Disisi'),
      noSuratIzinUsaha: Yup.string().required('Harus Disisi'),
      luasGudang: Yup.number().required('Harus Disisi'),
      lamaOperasional: Yup.number().required('Harus Disisi'),
      jumlahPekerja: Yup.number().required('Harus Disisi'),
      statusKepemilikanGudang: Yup.string().required('Harus Disisi'),
    }),
    onSubmit: (values) => {
      handleNext(4, 'Alamat Usaha', values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        id="namaUsaha"
        name="namaUsaha"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.namaUsaha}
        autoFocus
        error={formik.touched.namaUsaha && Boolean(formik.errors.namaUsaha)}
        helperText={formik.touched.namaUsaha && formik.errors.namaUsaha}
        label={'Nama Usaha'}
        placeholder="Cth. PT ABC"
      />
      <TextInput
        id="noSuratIzinUsaha"
        name="noSuratIzinUsaha"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.noSuratIzinUsaha}
        autoFocus
        error={formik.touched.noSuratIzinUsaha && Boolean(formik.errors.noSuratIzinUsaha)}
        helperText={formik.touched.noSuratIzinUsaha && formik.errors.noSuratIzinUsaha}
        label={'Nomor Surat Izin Usaha'}
      />
      <TextInput
        id="lamaOperasional"
        name="lamaOperasional"
        type="number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lamaOperasional}
        autoFocus
        error={formik.touched.lamaOperasional && Boolean(formik.errors.lamaOperasional)}
        helperText={formik.touched.lamaOperasional && formik.errors.lamaOperasional}
        label={'Lama Operasional (Tahun)'}
        placeholder="Cth. 2"
      />
      <TextInput
        id="luasGudang"
        name="luasGudang"
        type="number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.luasGudang}
        autoFocus
        error={formik.touched.luasGudang && Boolean(formik.errors.luasGudang)}
        helperText={formik.touched.luasGudang && formik.errors.luasGudang}
        label={'Luas Gudang (M2)'}
        placeholder="Cth 100"
      />
      <TextInput
        id="jumlahPekerja"
        name="jumlahPekerja"
        type="number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.jumlahPekerja}
        autoFocus
        error={formik.touched.jumlahPekerja && Boolean(formik.errors.jumlahPekerja)}
        helperText={formik.touched.jumlahPekerja && formik.errors.jumlahPekerja}
        label={'Jumlah Pekerja'}
        placeholder="Cth 10"
      />

      <SelectInput
        label={'Status Kepemilikan'}
        name="statusKepemilikanGudang"
        id="statusKepemilikanGudang"
        value={formik.values.statusKepemilikanGudang}
        onChange={formik.handleChange}
        error={formik.touched.statusKepemilikanGudang && Boolean(formik.errors.statusKepemilikanGudang)}
        option={[{ value: 'Milik Sendiri', label: 'Milik Sendiri' }]}
      />
      <ButtonPrimary type="submit" label="Selanjutnya" />
    </form>
  );
}

Step3.propTypes = {
  handleNext: PropTypes.func,
  values: PropTypes.any,
};
