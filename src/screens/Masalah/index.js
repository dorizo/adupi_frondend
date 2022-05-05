import React, { useState } from 'react';
import { InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { StaticTimePicker } from '@mui/x-date-pickers';
import BarMobile from '../../components/BarMobile';
import masalah from '../../assets/illustation/masalah.png';
import AdupiXMayoraHead from '../../components/AdupiXMayoraHead';
import useDrawer from '../../hooks/useDrawer';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import TextInput from '../../components/TextInput';

export default function Masalah() {
  const { onOpen, Drawer } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
  const [beliTime, setBeliTime] = useState(new Date());
  const [selectedImg, setSelectedImg] = useState(null);
  const [step, setStep] = useState(0);

  const handleOpen = (a, s) => {
    setDrawerTitle(a);
    setStep(s);
    onOpen();
  };
  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setSelectedImg(reader.result);
    };
  };
  const removeImg = () => {
    setSelectedImg(null);
  };
  return (
    <>
      <BarMobile title={'Masalah'} />
      <AdupiXMayoraHead />
      <img alt="recyle logo" width="100%" src={masalah} />
      <div style={{ marginTop: 5, textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Laporkan
        </Typography>
        <Typography align="center" variant="h2">
          Masalah
        </Typography>
        <ButtonPrimary
          onClick={() => handleOpen('Masalah', 0)}
          style={{ marginTop: 40, marginBottom: 5 }}
          label={'Masukkan Data'}
        />
      </div>
      <Drawer title={drawerTitle}>
        {step === 0 && (
          <>
            <InputLabel sx={{ marginTop: 2 }} id="jenis-masalah">
              Jenis Masalah
            </InputLabel>
            <Select
              fullWidth
              labelId="jenis-masalah"
              placeholder="Pilih Salah Satu"
              variant="standard"
              sx={{ marginBottom: 1 }}
              id="jenis-masalah-select-standard"
              label="Sumber Sampah"
            >
              <MenuItem value="">
                <em>Pilih Salah Satu</em>
              </MenuItem>
              <MenuItem value={'Rusak Mesin'}>Rusak Mesin</MenuItem>
              <MenuItem value={'Rusak Kendaraan'}>Rusak Kendaraan</MenuItem>
            </Select>
            <TextInput multiline rows={3} label={'Dekskripsikan Masalah'} />
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
              <ButtonPrimary upload={handleUploadClick} component="label" label="Unggah File" />
            </div>
            <ButtonPrimary disabled type="submit" label="Selesai" />
          </>
        )}
      </Drawer>
    </>
  );
}
