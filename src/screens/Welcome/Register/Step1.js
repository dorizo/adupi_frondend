import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { CHECK_EMAIL, CHECK_NIK, CHECK_NO_HP } from '../../../api/mitra';
import { GET_ALL_PROVINSI, GET_DESA, GET_KABUPATEN, GET_KECAMATAN } from '../../../api/wilayah';
import ButtonPrimary from '../../../components/Button/ButtonPrimary';
import SelectInput from '../../../components/SelectInput';
import TextInput from '../../../components/TextInput';

/* eslint-disable radix */

export default function Step1({ handleNext, values, isLoading }) {
  // const [jenisMitraList, setJenisMitraList] = useState([
  //   { value: 'PT', label: 'PT' },
  //   { value: 'CV', label: 'CV' },
  //   { value: 'Lapak Giling', label: 'Lapak Giling' },
  //   { value: 'Bank Sampah', label: 'Bank Sampah' },
  // ]);
  const jenisMitraList = [
    { value: 'PT', label: 'PT' },
    { value: 'CV', label: 'CV' },
    { value: 'UD', label: 'UD' },
  ];
  const [provinsi, setProvinsi] = useState();
  const [kabupaten, setKabupaten] = useState();
  const [kecamatan, setKecamatan] = useState();
  const [desa, setDesa] = useState();

  const [loading, setLoading] = useState(false);
  const idPro = values?.wilayahCode && values.wilayahCode.split('.')[0];
  const idKab = values?.wilayahCode && `${values.wilayahCode.split('.')[0]}.${values.wilayahCode.split('.')[1]}`;
  const idKec =
    values?.wilayahCode &&
    `${values.wilayahCode.split('.')[0]}.${values.wilayahCode.split('.')[1]}.${values.wilayahCode.split('.')[2]}`;

  async function getPro() {
    setLoading(true);
    GET_ALL_PROVINSI()
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            const wil = { value: p.wilayahCode, label: p.wilayah };
            return wil;
          });
        if (values?.wilayahCode) {
          getKab(idPro);
        }
        setProvinsi(list);
      })
      .catch((e) => {
        setProvinsi();
        console.log(e);
      });
    setKabupaten();
    setKecamatan();
    setDesa();
    setLoading(false);
  }
  async function getKab(id) {
    setLoading(true);
    GET_KABUPATEN(id)
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            const wil = { value: p.wilayahCode, label: p.wilayah };
            return wil;
          });
        if (values?.wilayahCode) {
          getKec(idKab);
        }
        setKabupaten(list);
      })
      .catch((e) => {
        setKabupaten();
        console.log(e);
      });
    setKecamatan();
    setDesa();
    setLoading(false);
  }
  async function getKec(id) {
    setLoading(true);
    GET_KECAMATAN(id)
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            const wil = { value: p.wilayahCode, label: p.wilayah };
            return wil;
          });
        if (values?.wilayahCode) {
          getDesa(idKec);
        }
        setKecamatan(list);
      })
      .catch((e) => {
        setKecamatan();
        console.log(e);
      });
    setDesa();
    setLoading(false);
  }
  async function getDesa(id) {
    setLoading(true);
    GET_DESA(id)
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            const wil = { value: p.wilayahCode, label: p.wilayah };
            return wil;
          });
        console.log(res);
        setDesa(list);
      })
      .catch((e) => {
        setDesa();
        console.log(e);
      });
    setLoading(false);
  }
  const handleChangeProvinsi = (e) => {
    getKab(e.target.value);
  };
  const handleChangeKabupaten = (e) => {
    getKec(e.target.value);
  };
  const handleChangeKecamatan = (e) => {
    getDesa(e.target.value);
  };
  const formik = useFormik({
    initialValues: {
      nama: values.nama || null,
      nik: values.nik || null,
      noHp: values.noHp || null,
      jenisKelamin: values.jenisKelamin || null,
      jenisMitra: values.jenisMitra || null,
      tanggalLahir: values?.tanggalLahir ? new Date(values?.tanggalLahir) : new Date(),
      tempatLahir: values.tempatLahir || null,
      wilayahCode: values.wilayahCode || null,
      alamat: values.alamat || null,
      email: values.email || null,
    },
    validationSchema: Yup.object({
      nama: Yup.string().required('Harus Disisi'),
      nik: Yup.string().max(16).min(16).required('Harus Disisi'),
      noHp: Yup.string().required('Harus Disisi'),
      jenisKelamin: Yup.string().required('Harus Disisi'),
      jenisMitra: Yup.string().required('Harus Disisi'),
      tanggalLahir: Yup.date().required('Harus Disisi'),
      tempatLahir: Yup.string().required('Harus Disisi'),
      wilayahCode: Yup.string().required('Harus Disisi'),
      alamat: Yup.string().required('Harus Disisi'),
      email: Yup.string().email('Masukan Email Valid').required('Harus Diisi'),
    }),
    onSubmit: async (values, { setFieldError }) => {
      setLoading(true);
      const resCM = await CHECK_EMAIL({ email: values.email });
      const resCNIK = await CHECK_NIK({ nik: values.nik });
      const resCNO = await CHECK_NO_HP({ noHp: values.noHp });
      if (resCM.status === 400) {
        await setFieldError('email', resCM.data.message);
      }
      if (resCNIK.status === 400) {
        await setFieldError('nik', resCNIK.data.message);
      }
      if (resCNO.status === 400) {
        await setFieldError('noHp', resCNO.data.message);
      }
      if (resCM.status === 200 && resCNIK.status === 200 && resCNO.status === 200) {
        handleNext(2, 'Upload KTP', { ...values, tanggalLahir: format(values?.tanggalLahir, 'yyyy-MM-dd') });
      }
      setLoading(false);
    },
  });
  useEffect(() => {
    getPro();
  }, []);
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        name="nama"
        id="nama"
        value={formik.values.nama}
        onChange={formik.handleChange}
        error={formik.touched.nama && Boolean(formik.errors.nama)}
        helperText={formik.touched.nama && formik.errors.nama}
        label={'Nama'}
        placeholder="Masukkan Nama"
      />
      <TextInput
        name="nik"
        id="nik"
        // onInput={(e) => {
        //   e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16);
        // }}
        value={formik.values.nik}
        onChange={formik.handleChange}
        error={formik.touched.nik && Boolean(formik.errors.nik)}
        helperText={formik.touched.nik && formik.errors.nik}
        label={'NIK'}
        type="number"
        placeholder="Masukkan Nomor Induk Kependudukan"
      />
      <TextInput
        name="tempatLahir"
        id="tempatLahir"
        value={formik.values.tempatLahir}
        onChange={formik.handleChange}
        error={formik.touched.tempatLahir && Boolean(formik.errors.tempatLahir)}
        helperText={formik.touched.tempatLahir && formik.errors.tempatLahir}
        label={'Tempat Lahir'}
        placeholder="Masukkan tempat lahir"
      />
      <DatePicker
        openTo="year"
        views={['year', 'month', 'day']}
        label="Tanggal Lahir"
        value={formik.values.tanggalLahir}
        onChange={(newValue) => {
          formik.setValues({ ...formik.values, tanggalLahir: newValue });
        }}
        renderInput={(params) => (
          <TextField
            variant="standard"
            sx={{ marginTop: 1, marginBottom: 1 }}
            fullWidth
            name="tanggalLahir"
            id="tanggalLahir"
            error={formik.touched.tanggalLahir && Boolean(formik.errors.tanggalLahir)}
            helperText={formik.touched.tanggalLahir && formik.errors.tanggalLahir}
            {...params}
          />
        )}
      />
      <SelectInput
        label="Jenis Kelamin"
        name="jenisKelamin"
        id="jenisKelamin"
        value={formik.values.jenisKelamin}
        error={formik.touched.jenisKelamin && Boolean(formik.errors.jenisKelamin)}
        onChange={formik.handleChange}
        option={[
          { value: 'L', label: 'Laki-laki' },
          { value: 'P', label: 'Perempuan' },
        ]}
      />
      <TextInput
        value={formik.values.noHp}
        name="noHp"
        id="noHp"
        onChange={formik.handleChange}
        error={formik.touched.noHp && Boolean(formik.errors.noHp)}
        helperText={formik.touched.noHp && formik.errors.noHp}
        label={'No. HP'}
        type="number"
        placeholder="Masukkan Nomor Handphone"
      />
      <TextInput
        value={formik.values.email}
        name="email"
        id="email"
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        label={'Email'}
        type="email"
        placeholder="Masukkan Email"
      />
      <SelectInput
        label="Jenis Mitra"
        name="jenisMitra"
        id="jenisMitra"
        value={formik.values.jenisMitra}
        onChange={formik.handleChange}
        error={formik.touched.jenisMitra && Boolean(formik.errors.jenisMitra)}
        option={jenisMitraList}
      />
      <SelectInput
        value={(values?.wilayahCode && idPro) || undefined}
        label="Provinsi"
        option={provinsi}
        onChange={handleChangeProvinsi}
      />
      <SelectInput
        value={(values?.wilayahCode && idKab) || undefined}
        label="Kota/Kabupaten"
        option={kabupaten}
        onChange={handleChangeKabupaten}
      />
      <SelectInput
        value={(values?.wilayahCode && idKec) || undefined}
        label="Kecamatan"
        option={kecamatan}
        onChange={handleChangeKecamatan}
      />
      <SelectInput
        name="wilayahCode"
        id="wilayahCode"
        value={formik.values.wilayahCode}
        onChange={formik.handleChange}
        label="Kelurahan"
        option={desa}
        error={formik.touched.wilayahCode && Boolean(formik.errors.wilayahCode)}
      />
      <TextInput
        name="alamat"
        id="alamat"
        value={formik.values.alamat}
        onChange={formik.handleChange}
        label={'Alamat'}
        placeholde="Masukkan Alamat"
        error={formik.touched.alamat && Boolean(formik.errors.alamat)}
        helperText={formik.touched.alamat && formik.errors.alamat}
        rows={3}
        multiline
      />
      <ButtonPrimary disabled={loading || isLoading} type="submit" label="Selanjutnya" />
    </form>
  );
}

Step1.propTypes = {
  handleNext: PropTypes.func,
  values: PropTypes.any,
  isLoading: PropTypes.any,
};
