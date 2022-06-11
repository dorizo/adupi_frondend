import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { GET_ALL_ANGGOTA } from '../../api/anggota';
import { GET_ALL_JENIS_SAMPAH } from '../../api/jenis_sampah';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import SelectInput from '../../components/SelectInput';
import TextInput from '../../components/TextInput';

/* eslint-disable no-nested-ternary */
/* eslint-disable radix */

export default function Form({ next, setSelectedImg, step, selectedImg, values, setValues, isLoading, handleAdd }) {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowFrom] = useState(false);
  const [form, setForm] = useState({ sumber: '', jsCode: '', harga: '', berat: '', jenis: '' });

  const [sampah, setSampah] = useState([]);
  const { data } = useQuery('GET_ALL_ANGGOTA', GET_ALL_ANGGOTA, {
    refetchOnMount: true,
  });
  const { data: dataJenis } = useQuery('GET_ALL_JENIS_SAMPAH', GET_ALL_JENIS_SAMPAH, {
    refetchOnMount: true,
  });
  const optionJs =
    dataJenis &&
    dataJenis?.data?.data.map((js) => {
      return { value: js.jsCode, label: js.jenis };
    });
  const anggota = data && data?.data?.data;

  const handleOpen = (a, s, val) => {
    setLoading(true);
    setValues({ ...values, ...val });
    next(a, s);
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
  const removeListSampah = (index) => {
    const valuess = [...sampah];
    valuess.splice(index);
    setSampah(valuess);
  };
  const handelSimpan = () => {
    setSampah([...sampah, form]);
    setSampah([...sampah, form]);
    setForm({ sumber: '', jsCode: '', harga: '', berat: '', jenis: '' });
    setShowFrom(false);
  };
  const handleJenis = (e) => {
    const jenis = optionJs.find((j) => j.value === e.target.value);
    setForm({ ...form, jsCode: e.target.value, jenis: jenis.label });
  };
  return (
    <form>
      {step === 0 && (
        <>
          <Grid sx={{ padding: 3 }} container spacing={2}>
            {anggota &&
              anggota.map((m, i) => (
                <Grid onClick={() => handleOpen('Sampah', 1, { anggotaCode: m?.anggotaCode })} key={i} item xs={6}>
                  <Card
                    style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
                  >
                    <CardContent
                      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 15 }}
                    >
                      <Typography style={{ fontWeight: 'bold', fontSize: 12 }} variant="body1">
                        {m.nama}
                      </Typography>
                      <Typography style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 11 }} variant="body2">
                        {m.nik}
                      </Typography>
                      <Typography style={{ fontSize: 10 }} variant="alamat">
                        {m.alamat}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </>
      )}
      {step === 1 && (
        <>
          {sampah &&
            sampah.map((m, i) => (
              <Card key={i} style={{ marginBottom: 10 }}>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography sx={{ fontWeight: 'bold' }}>{m?.jenis}</Typography>
                      <Typography sx={{ fontSize: 12 }}>Sumber : {m?.sumber}</Typography>
                      <Typography sx={{ fontSize: 12 }}>Kapasitas : {m?.berat}</Typography>
                      <Typography sx={{ fontSize: 12 }}>Kapasitas : {m?.harga}</Typography>
                      <Button onClick={() => removeListSampah(i)} size="small" variant="outlined" color="error">
                        Hapus
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          <Button
            variant="outlined"
            style={{ marginBottom: 10 }}
            onClick={() => setShowFrom(!showForm)}
            color="success"
          >
            {showForm ? 'Batal' : 'Tambah Sampah'}
          </Button>
          <form>
            {showForm && (
              <>
                <SelectInput
                  label={'Sumber Sampah'}
                  name="sumber"
                  id="sumber"
                  onChange={(e) => setForm({ ...form, sumber: e.target.value })}
                  value={form.sumber}
                  option={['Perkantoran', 'Perumahan', 'Kawasan Industri', 'Fasilitas Umum', 'Fasilitas Khusus'].map(
                    (va) => {
                      return { value: va, label: va };
                    }
                  )}
                />
                <SelectInput
                  label={'Jenis Sampah'}
                  name="jsCode"
                  id="jsCode"
                  onChange={handleJenis}
                  value={form.jsCode}
                  option={optionJs && optionJs}
                />
                <TextInput
                  id="harga"
                  name="harga"
                  type="number"
                  onChange={(e) => setForm({ ...form, harga: e.target.value })}
                  value={form.harga}
                  label={'Harga'}
                />
                <TextInput
                  id="berat"
                  name="berat"
                  type="number"
                  onChange={(e) => setForm({ ...form, berat: e.target.value })}
                  value={form.berat}
                  label={'Berat'}
                />
                <ButtonPrimary onClick={handelSimpan} style={{ marginTop: 30, marginBottom: 5 }} label={'Tambah'} />
              </>
            )}
            <ButtonPrimary
              type="submit"
              disabled={sampah.length === 0}
              onClick={() =>
                handleOpen('Upload Nota', 2, {
                  detail: sampah.map((s) => {
                    delete s.jenis;
                    return s;
                  }),
                })
              }
              label="Selanjutnya"
            />
          </form>
        </>
      )}
      {step === 2 && (
        <>
          <div style={{ paddingLeft: 40, paddingRight: 40, marginBottom: 20 }}>
            {selectedImg && (
              <a role="button" tabIndex={0} onKeyDown={removeImg} onClick={removeImg}>
                <img style={{ margin: 10 }} src={selectedImg} alt={`img-nota`} />
              </a>
            )}
            <ButtonPrimary upload={handleUploadClick} component="label" label="Unggah File" />
          </div>
          <ButtonPrimary disabled={loading || isLoading} onClick={handleAdd} label="Selesai" />
        </>
      )}
    </form>
  );
}

Form.propTypes = {
  next: PropTypes.any,
  setSelectedImg: PropTypes.any,
  step: PropTypes.any,
  selectedImg: PropTypes.any,
  setValues: PropTypes.any,
  isLoading: PropTypes.any,
  values: PropTypes.any,
  handleAdd: PropTypes.func,
};
