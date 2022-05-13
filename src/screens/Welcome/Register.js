import { Box, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import TextInput from '../../components/TextInput';

export default function Register({ handleNext, step }) {
  return (
    <>
      {step === 1 && <Step1 handleNext={handleNext} />}
      {step === 2 && <Step2 handleNext={handleNext} />}
      {step === 3 && <Step3 handleNext={handleNext} />}
      {step === 4 && <Step4 handleNext={handleNext} />}
    </>
  );
}
const Step1 = ({ handleNext }) => {
  const [tglLahir, setTglLahir] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: '',
      tempat_lahir: '',
      alamat: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().max(20, 'Must be 20 characters or less'),
      alamat: Yup.string().max(100, 'Must be 100 characters or less'),
      tempat_lahir: Yup.string().max(20, 'Must be 20 characters or less'),
      email: Yup.string().email('Invalid email address'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        autoFocus
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        label={'Nama Lengkap'}
        placeholder="Cth. Nama Lengkap Kamu"
      />
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
        label={'Email'}
        placeholder="Cth. namaemail@emailkamu.com"
      />
      <TextInput
        id="tempat_lahir"
        name="tempat_lahir"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.tempat_lahir}
        autoFocus
        error={formik.touched.tempat_lahir && Boolean(formik.errors.tempat_lahir)}
        helperText={formik.touched.tempat_lahir && formik.errors.tempat_lahir}
        label={'Tempat Lahir'}
        placeholder="Cth. Bandar Lampung"
      />
      <DatePicker
        disableFuture
        label="Tanggal Lahir"
        value={tglLahir}
        onChange={(newValue) => {
          setTglLahir(newValue);
        }}
        renderInput={(params) => <TextField fullWidth variant="standard" {...params} />}
      />
      <TextInput
        id="alamat"
        name="alamat"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.alamat}
        autoFocus
        error={formik.touched.alamat && Boolean(formik.errors.alamat)}
        helperText={formik.touched.alamat && formik.errors.alamat}
        multiline
        rows={2}
        style={{ marginBottom: 20 }}
        label={'Alamat'}
        placeholder="Cth. Bandar Lampung"
      />
      <ButtonPrimary type="submit" onClick={() => handleNext(2, 'Data Usaha')} label="Selanjutnya" />
    </form>
  );
};
const Step2 = ({ handleNext }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      tempat_lahir: '',
      alamat: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().max(20, 'Must be 20 characters or less'),
      alamat: Yup.string().max(100, 'Must be 100 characters or less'),
      tempat_lahir: Yup.string().max(20, 'Must be 20 characters or less'),
      email: Yup.string().email('Invalid email address'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        autoFocus
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        label={'Nama Usaha'}
        placeholder="Cth. Nama Lengkap Kamu"
      />
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
        label={'Nomor Surat Izin Usaha'}
        placeholder="Cth. namaemail@emailkamu.com"
      />
      <TextInput
        id="tempat_lahir"
        name="tempat_lahir"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.tempat_lahir}
        autoFocus
        error={formik.touched.tempat_lahir && Boolean(formik.errors.tempat_lahir)}
        helperText={formik.touched.tempat_lahir && formik.errors.tempat_lahir}
        label={'Luas Gudang'}
        placeholder="Cth. Bandar Lampung"
      />
      <InputLabel id="demo-simple-select-standard-label">Status Kepemilikan Gudang</InputLabel>
      <Select
        fullWidth
        labelId="demo-simple-select-standard-label"
        variant="standard"
        sx={{ marginTop: 1, marginBottom: 1 }}
        id="demo-simple-select-standard"
        label="Status Kepemilikan Gudang"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>

      <InputLabel id="demo-simple-select-standard-label">Mesin</InputLabel>
      <Select
        fullWidth
        labelId="demo-simple-select-standard-label"
        variant="standard"
        sx={{ marginTop: 1, marginBottom: 1 }}
        id="demo-simple-select-standard"
        label="Mesin"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>

      <TextInput
        id="alamat"
        name="alamat"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.alamat}
        autoFocus
        error={formik.touched.alamat && Boolean(formik.errors.alamat)}
        helperText={formik.touched.alamat && formik.errors.alamat}
        style={{ marginBottom: 20 }}
        label={'Lama Operasional'}
        placeholder="Cth. Bandar Lampung"
      />
      <TextInput
        id="alamat"
        name="alamat"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.alamat}
        autoFocus
        error={formik.touched.alamat && Boolean(formik.errors.alamat)}
        helperText={formik.touched.alamat && formik.errors.alamat}
        style={{ marginBottom: 20 }}
        label={'Jumlah Pekerja'}
        placeholder="Cth. Bandar Lampung"
      />
      <TextInput
        id="alamat"
        name="alamat"
        type="text"
        multiline
        rows={3}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.alamat}
        autoFocus
        error={formik.touched.alamat && Boolean(formik.errors.alamat)}
        helperText={formik.touched.alamat && formik.errors.alamat}
        style={{ marginBottom: 20 }}
        label={'Alamat Usaha'}
        placeholder="Cth. Bandar Lampung"
      />
      <ButtonPrimary type="submit" onClick={() => handleNext(3, 'Unggah Foto Gudang')} label="Selanjutnya" />
    </form>
  );
};
const Step3 = ({ handleNext }) => {
  const [selectedImg, setSelectedImg] = useState([]);
  const handleUploadClick = (event) => {
    if (selectedImg.length > 3) {
      return alert('max img 3');
    }
    console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setSelectedImg([...selectedImg, reader.result]);
    };
  };
  const removeImg = (index) => {
    const array = [...selectedImg]; // make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1);
      setSelectedImg(array);
    }
  };
  return (
    <>
      <div style={{ paddingLeft: 40, paddingRight: 40, marginBottom: 20 }}>
        {selectedImg.map((img, i) => (
          <a role="button" tabIndex={i} onKeyDown={() => removeImg(i)} onClick={() => removeImg(i)}>
            <img style={{ margin: 10 }} src={img} alt={`img-${i}`} />
          </a>
        ))}
        <ButtonPrimary
          disabled={selectedImg.length >= 3}
          upload={handleUploadClick}
          component="label"
          label="Unggah File"
        />
      </div>
      <ButtonPrimary type="submit" onClick={() => handleNext(4, 'Daftar Akun')} label="Selesai" />
    </>
  );
};
const Step4 = ({ handleNext }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '',
      password2: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().max(20, 'Must be 20 characters or less'),
      password2: Yup.string().max(20, 'Must be 20 characters or less'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
        autoFocus
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
        autoFocus
        error={formik.touched.password2 && Boolean(formik.errors.password2)}
        helperText={formik.touched.password2 && formik.errors.password2}
        label={'Masukkan Lagi Password'}
      />
      <ButtonPrimary type="submit" onClick={() => navigate('/mobile')} label="Selanjutnya" />
    </form>
  );
};
