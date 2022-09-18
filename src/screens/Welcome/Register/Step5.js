import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ButtonPrimary from '../../../components/Button/ButtonPrimary';
import SelectInput from '../../../components/SelectInput';
import TextInput from '../../../components/TextInput';

export default function Step5({ handleNext, values, isLoading }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [showForm, setShowFrom] = useState(false);
  const [form, setForm] = useState({ statusKepemilikanMesin: '', jenisMesin: '', kapasitas: '' });
  const [mesin, setMesin] = useState(values?.mesin || []);
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
              option={[{ value: 'Milik Sendiri', label: 'Milik Sendiri' } ,{ value: 'Program GESN', label: 'Program GESN' } ,{ value: 'Sewa', label: 'Sewa' } ,{ value: 'Hak Pakai', label: 'Hak Pakai' }]}
            />
            <SelectInput
              label="Jenis Mesin"
              name="jenisMesin"
              id="jenisMesin"
              value={form.jenisMesin}
              onChange={(e) => setForm({ ...form, jenisMesin: e.target.value })}
              option={[{ value: 'Mesin Press', label: 'Mesin Press' },{ value: 'conveyor belt', label: 'Conveyor Belt' },{ value: 'Mesin Cacah', label: 'Mesin Cacah' },{ value: 'Mesin Pengering', label: 'Mesin Pengering' },{ value: 'Mesin kupas label', label: 'Mesin kupas label' }]}
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
          disabled={mesin.length === 0 || isLoading}
          onClick={() => handleNext(6, 'Daftar Akun', { mesin })}
          label="Selanjutnya"
        />
      </form>
    </>
  );
}

Step5.propTypes = {
  handleNext: PropTypes.func,
  isLoading: PropTypes.any,
  values: PropTypes.any,
};
