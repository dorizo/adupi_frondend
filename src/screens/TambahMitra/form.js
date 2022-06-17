import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { GET_ALL_PROVINSI, GET_DESA, GET_KABUPATEN, GET_KECAMATAN } from '../../api/wilayah';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import SelectInput from '../../components/SelectInput';
import TextInput from '../../components/TextInput';

const initialVal = {
  nama: '',
  nik: '',
  noHp: '',
  jenisKelamin: '',
  wilayahCode: '',
  jenisMitra: '',
  tempatLahir: '',
  tanggalLahir: new Date(),
  ktp: '',
  alamat: '',
  email: '',
  password: '',
};
/* eslint-disable no-nested-ternary */
/* eslint-disable radix */

export default function Form({ next, setSelectedImg, step, values, selectedImg, setValues, handleAdd }) {
  const [isNext, setIsNext] = useState({ a: '', s: '' });
  const [provinsi, setProvinsi] = useState();
  const [kabupaten, setKabupaten] = useState();
  const [kecamatan, setKecamatan] = useState();
  const [desa, setDesa] = useState();
  const [loading, setLoading] = useState(false);

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
        console.log(res);
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
        console.log(res);
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
  const handleSubmit = (val) => {
    if (step !== 1) {
      if (values === undefined) {
        setValues([val]);
      } else {
        setValues([...values, val]);
      }
    }
    if (step === 3) {
      handleAdd(values);
    } else {
      next(isNext.a, isNext.s);
    }
  };
  const formik = useFormik({
    initialValues: initialVal,
    validationSchema: Yup.object(
      step === 0
        ? {
            nama: Yup.string().required('Harus Disisi'),
            nik: Yup.number()
              .test('len', 'NIK harus 16', (val) => val.toString().length === 16)
              .required('Harus Disisi'),
            noHp: Yup.string().required('Harus Disisi'),
            jenisKelamin: Yup.string().required('Harus Disisi'),
            jenisMitra: Yup.string().required('Harus Disisi'),
            tanggalLahir: Yup.date().required('Harus Disisi'),
            tempatLahir: Yup.string().required('Harus Disisi'),
            // ktp: Yup.string().required('Harus Disisi'),
          }
        : step === 2
        ? {
            wilayahCode: Yup.string().required('Harus Disisi'),
            alamat: Yup.string().required('Harus Disisi'),
          }
        : step === 3
        ? {
            email: Yup.string().email('Must be a valid email').required('Harus Disisi'),
            password: Yup.string().required('Harus Disisi'),
          }
        : null
    ),
    onSubmit: handleSubmit,
  });

  const handleOpen = (a, s) => {
    setIsNext({ a, s });
    formik.submitForm();
  };
  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);
    reader.onloadend = () => {
      setSelectedImg(reader.result);
    };
  };
  const removeImg = () => {
    setSelectedImg(null);
  };
  const handleChangeProvinsi = (e) => {
    getKab(e.target.value);
  };
  const handleChangeKabupaten = (e) => {
    getKec(e.target.value);
  };
  const handleChangeKecamatan = (e) => {
    getDesa(e.target.value);
  };
  useEffect(() => {
    getPro();
  }, []);
  return (
    <form onSubmit={formik.handleSubmit}>
      {step === 0 && (
        <>
          <SelectInput
            label="Jenis Mitra"
            name="jenisMitra"
            value={formik.values.jenisMitra}
            onChange={formik.handleChange}
            error={formik.touched.jenisMitra && Boolean(formik.errors.jenisMitra)}
            option={[
              { value: 'PT', label: 'PT' },
              { value: 'CV', label: 'CV' },
              { value: 'Lapak Giling', label: 'Lapak Giling' },
              { value: 'Bank Sampah', label: 'Bank Sampah' },
            ]}
          />
          <TextInput
            name="nik"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16);
            }}
            id="nik"
            value={formik.values.nik}
            onChange={formik.handleChange}
            error={formik.touched.nik && Boolean(formik.errors.nik)}
            helperText={formik.touched.nik && formik.errors.nik}
            label={'NIK'}
            type="number"
            placeholder="Masukkan Nomor Induk Kependudukan"
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
          <ButtonPrimary
            disabled={loading}
            onClick={() => handleOpen('Upload KTP', 1)}
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
            <ButtonPrimary upload={handleUploadClick} component="label" label="Unggah File" />
          </div>
          <ButtonPrimary
            disabled={selectedImg === null || loading}
            onClick={() => handleOpen('Alamat Mitra', 2)}
            style={{ marginTop: 30, marginBottom: 5 }}
            label={'Selanjutnya'}
          />
        </>
      )}
      {step === 2 && (
        <>
          <SelectInput label="Provinsi" option={provinsi} onChange={handleChangeProvinsi} />
          <SelectInput label="Kota/Kabupaten" option={kabupaten} onChange={handleChangeKabupaten} />
          <SelectInput label="Kecamatan" option={kecamatan} onChange={handleChangeKecamatan} />
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
          <ButtonPrimary
            disabled={loading}
            onClick={() => handleOpen('Daftar Akun', 3)}
            style={{ marginTop: 30, marginBottom: 5 }}
            label={'Selanjutnya'}
          />
        </>
      )}
      {step === 3 && (
        <>
          <TextInput
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label={'Atur Usermname'}
            Placeholder="Masukan username"
          />
          <TextInput
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            label={'Atur Password'}
            Placeholder="Masukan password"
            type="password"
          />
          <ButtonPrimary disabled={loading} type="submit" label="Selesai" />
        </>
      )}
    </form>
  );
}
Form.propTypes = {
  next: PropTypes.any,
  setSelectedImg: PropTypes.any,
  step: PropTypes.any,
  values: PropTypes.any,
  selectedImg: PropTypes.any,
  setValues: PropTypes.any,
  handleAdd: PropTypes.any,
};
