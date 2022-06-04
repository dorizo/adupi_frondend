import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { GET_ALL_PROVINSI, GET_DESA, GET_KABUPATEN, GET_KECAMATAN } from '../../api/wilayah';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import SelectInput from '../../components/SelectInput';
import TextInput from '../../components/TextInput';

const containerStyle = {
  width: '400%',
  height: '400px',
};

const center = {
  lat: -6.258752,
  lng: 106.6201363,
};

export default function Register({ handleNext, step }) {
  return (
    <>
      {step === 1 && <Step1 handleNext={handleNext} />}
      {step === 2 && <Step2 handleNext={handleNext} />}
      {step === 3 && <Step3 handleNext={handleNext} />}
      {step === 4 && <Step4 handleNext={handleNext} />}
      {step === 5 && <Step5 handleNext={handleNext} />}
      {step === 6 && <Step6 handleNext={handleNext} />}
    </>
  );
}
const Step1 = ({ handleNext }) => {
  // const [jenisMitraList, setJenisMitraList] = useState([
  //   { value: 'PT', label: 'PT' },
  //   { value: 'CV', label: 'CV' },
  //   { value: 'Lapak Giling', label: 'Lapak Giling' },
  //   { value: 'Bank Sampah', label: 'Bank Sampah' },
  // ]);
  const jenisMitraList = [
    { value: 'PT', label: 'PT' },
    { value: 'CV', label: 'CV' },
  ];
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
          res.data.data.map((p) => {
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
          res.data.data.map((p) => {
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
          res.data.data.map((p) => {
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
          res.data.data.map((p) => {
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
      nama: null,
      nik: null,
      noHp: null,
      jenisKelamin: null,
      jenisMitra: null,
      tanggalLahir: new Date(),
      tempatLahir: null,
      wilayahCode: null,
      alamat: null,
      email: null,
    },
    validationSchema: Yup.object({
      nama: Yup.string().required('Harus Disisi'),
      nik: Yup.number().required('Harus Disisi'),
      noHp: Yup.string().required('Harus Disisi'),
      jenisKelamin: Yup.string().required('Harus Disisi'),
      jenisMitra: Yup.string().required('Harus Disisi'),
      tanggalLahir: Yup.date().required('Harus Disisi'),
      tempatLahir: Yup.string().required('Harus Disisi'),
      wilayahCode: Yup.string().required('Harus Disisi'),
      alamat: Yup.string().required('Harus Disisi'),
      email: Yup.string().email('Masukan Email Valid').required('Harus Diisi'),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleNext(2, 'Upload KTP', { ...values, tanggalLahir: format(values?.tanggalLahir, 'yyyy-MM-dd') });
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
      <ButtonPrimary disabled={loading} type="submit" label="Selanjutnya" />
    </form>
  );
};
const Step2 = ({ handleNext }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImg(reader.result);
    };
  };
  const removeImg = () => {
    setSelectedImg(null);
  };
  return (
    <>
      <div style={{ paddingLeft: 40, paddingRight: 40, marginBottom: 20 }}>
        {selectedImg && (
          <a style={{ width: '100%' }} role="button" tabIndex={0} onKeyDown={removeImg} onClick={removeImg}>
            <img style={{ margin: 10 }} src={selectedImg} alt={`img-nota`} />
          </a>
        )}
        <ButtonPrimary upload={handleUploadClick} component="label" label="Unggah File KTP" />
      </div>
      <ButtonPrimary
        disabled={selectedImg === null}
        onClick={() => handleNext(3, 'Data Usaha', { ktp: '-' })}
        // onClick={() => handleNext(3, 'Data Usaha', { ktp: selectedImg })}
        label="Selanjutnya"
      />
    </>
  );
};
const Step3 = ({ handleNext }) => {
  const formik = useFormik({
    initialValues: {
      namaUsaha: '',
      noSuratIzinUsaha: '',
      luasGudang: 0,
      lamaOperasional: 0,
      jumlahPekerja: 0,
      statusKepemilikanGudang: '',
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
};
const Step4 = ({ handleNext }) => {
  const [provinsi, setProvinsi] = useState();
  const [kabupaten, setKabupaten] = useState();
  const [kecamatan, setKecamatan] = useState();
  const [desa, setDesa] = useState();
  const [marker, setMarker] = useState();
  const [loading, setLoading] = useState(false);
  const [map, setMap] = React.useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImg(reader.result);
    };
  };
  const removeImg = () => {
    setSelectedImg(null);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
  });

  const onLoad = React.useCallback((m) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    m.fitBounds(bounds);
    setMap(m);
  }, []);

  const onUnmount = React.useCallback((m) => {
    setMap(null);
    console.log(m);
  }, []);

  console.log(map);

  const onMapClick = (val) => {
    setMarker(val.latLng);
  };

  async function getPro() {
    setLoading(true);
    GET_ALL_PROVINSI()
      .then((res) => {
        const list =
          res &&
          res.data.data.map((p) => {
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
          res.data.data.map((p) => {
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
          res.data.data.map((p) => {
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
          res.data.data.map((p) => {
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
      wilayahCodeUsaha: null,
      alamatUsaha: null,
      lang: null,
      lat: null,
    },
    validationSchema: Yup.object({
      wilayahCodeUsaha: Yup.string().required('Harus Disisi'),
      alamatUsaha: Yup.string().required('Harus Disisi'),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleNext(5, 'Data Mesin', { ...values, lat: marker?.lat(), lang: marker?.lng(), foto: '-' });
      // handleNext(5, 'Data Mesin', { ...values, lat: marker?.lat(), lang: marker?.lng(), foto: selectedImg });
    },
  });
  useEffect(() => {
    getPro();
  }, []);
  return (
    <form onSubmit={formik.handleSubmit}>
      <SelectInput label="Provinsi" option={provinsi} onChange={handleChangeProvinsi} />
      <SelectInput label="Kota/Kabupaten" option={kabupaten} onChange={handleChangeKabupaten} />
      <SelectInput label="Kecamatan" option={kecamatan} onChange={handleChangeKecamatan} />
      <SelectInput
        name="wilayahCodeUsaha"
        id="wilayahCodeUsaha"
        value={formik.values.wilayahCodeUsaha}
        onChange={formik.handleChange}
        label="Kelurahan"
        option={desa}
        error={formik.touched.wilayahCodeUsaha && Boolean(formik.errors.wilayahCodeUsaha)}
      />
      <TextInput
        name="alamatUsaha"
        id="alamatUsaha"
        value={formik.values.alamatUsaha}
        onChange={formik.handleChange}
        label={'Alamat'}
        placeholde="Masukkan Alamat Usaha"
        error={formik.touched.alamatUsaha && Boolean(formik.errors.alamatUsaha)}
        helperText={formik.touched.alamatUsaha && formik.errors.alamatUsaha}
        rows={3}
        multiline
      />
      <Card style={{ marginTop: 10, marginBottom: 10 }}>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            onClick={onMapClick}
            center={center}
            zoom={17}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {marker && <Marker position={marker} />}
          </GoogleMap>
        )}
      </Card>
      <div style={{ paddingLeft: 40, paddingRight: 40, marginBottom: 20 }}>
        {selectedImg && (
          <a style={{ width: '100%' }} role="button" tabIndex={0} onKeyDown={removeImg} onClick={removeImg}>
            <img style={{ margin: 10 }} src={selectedImg} alt={`img-nota`} />
          </a>
        )}
        {!selectedImg && <ButtonPrimary upload={handleUploadClick} component="label" label="Unggah Foto Gudang" />}
      </div>
      <ButtonPrimary type="submit" disabled={!marker || !selectedImg || loading} label="Selanjutnya" />
    </form>
  );
};
const Step5 = ({ handleNext }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [showForm, setShowFrom] = useState(false);
  const [form, setForm] = useState({ statusKepemilikanMesin: '', jenisMesin: '', kapasitas: '' });
  const [mesin, setMesin] = useState([]);
  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImg(reader.result);
    };
  };
  const removeImg = () => {
    setSelectedImg(null);
  };
  const removeListMesin = (index) => {
    const values = [...mesin];
    values.splice(index);
    console.log(values);
    setMesin(values);
  };
  const handelSimpan = () => {
    setMesin([...mesin, { ...form, foto: selectedImg }]);
    setMesin([...mesin, { ...form, foto: selectedImg }]);
    setForm({ statusKepemilikanMesin: '', jenisMesin: '', kapasitas: '' });
    setSelectedImg(null);
    setShowFrom(false);
  };
  return (
    <>
      {mesin &&
        mesin.map((m, i) => (
          <Card key={i} style={{ marginBottom: 10 }}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography sx={{ fontWeight: 'bold' }}>{m?.jenisMesin}</Typography>
                  <Typography sx={{ fontWeight: 'bold', fontSize: 12 }}>
                    Status : {m?.statusKepemilikanMesin}
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold', fontSize: 12 }}>Kapasitas : {m?.kapasitas}</Typography>
                  <Button onClick={() => removeListMesin(i)} size="small" variant="outlined" color="error">
                    Hapus
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <img width={100} height={100} src={m?.foto} alt={`img-nota`} />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      <Button variant="outlined" style={{ marginBottom: 10 }} onClick={() => setShowFrom(!showForm)} color="success">
        {showForm ? 'Batal' : 'Tambah Mesin'}
      </Button>
      <form>
        {showForm && (
          <>
            <SelectInput
              label={'Status Kepemilikan'}
              name="statusKepemilikanMesin"
              id="statusKepemilikanMesin"
              value={form.statusKepemilikanMesin}
              onChange={(e) => setForm({ ...form, statusKepemilikanMesin: e.target.value })}
              option={[{ value: 'Milik Sendiri', label: 'Milik Sendiri' }]}
            />
            <SelectInput
              label="Jenis Mesin"
              name="jenisMesin"
              id="jenisMesin"
              value={form.jenisMesin}
              onChange={(e) => setForm({ ...form, jenisMesin: e.target.value })}
              option={[{ value: 'Mesin Press', label: 'Mesin Press' }]}
            />
            <TextInput
              id="kapasitas"
              name="kapasitas"
              type="number"
              onChange={(e) => setForm({ ...form, kapasitas: e.target.value })}
              value={form.kapasitas}
              autoFocus
              label={'Kapasitas'}
            />
            <div style={{ paddingLeft: 40, paddingRight: 40, marginBottom: 20 }}>
              {selectedImg && (
                <a style={{ width: '100%' }} role="button" tabIndex={0} onKeyDown={removeImg} onClick={removeImg}>
                  <img style={{ margin: 10 }} src={selectedImg} alt={`img-nota`} />
                </a>
              )}
              {!selectedImg && <ButtonPrimary upload={handleUploadClick} component="label" label="Unggah Foto Mesin" />}
              <ButtonPrimary onClick={handelSimpan} label="Simpan" disabled={!selectedImg} style={{ marginTop: 5 }} />
            </div>
          </>
        )}
        <ButtonPrimary
          type="submit"
          disabled={mesin.length === 0}
          onClick={() => handleNext(6, 'Daftar Akun', { mesin })}
          label="Selanjutnya"
        />
      </form>
    </>
  );
};
const Step6 = ({ handleNext }) => {
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
      <ButtonPrimary type="submit" label="Daftar" />
    </form>
  );
};

Step1.propTypes = {
  handleNext: PropTypes.func,
};
Step2.propTypes = {
  handleNext: PropTypes.func,
};
Step3.propTypes = {
  handleNext: PropTypes.func,
};
Step4.propTypes = {
  handleNext: PropTypes.func,
};
Step5.propTypes = {
  handleNext: PropTypes.func,
};
Step6.propTypes = {
  handleNext: PropTypes.func,
};
Register.propTypes = {
  handleNext: PropTypes.func,
  step: PropTypes.any,
};
