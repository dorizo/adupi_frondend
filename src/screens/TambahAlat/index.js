import { InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import masalah from '../../assets/illustation/masalah.png';
import AdupiXMayoraHead from '../../components/AdupiXMayoraHead';
import BarMobile from '../../components/BarMobile';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import TextInput from '../../components/TextInput';
import useDrawer from '../../hooks/useDrawer';

export default function TambahAlat() {
  const { onOpen, Drawer } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
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
      <BarMobile title={'Tambah Alat'} />
      <AdupiXMayoraHead />
      <img alt="recyle logo" width="100%" src={masalah} />
      <div style={{ marginTop: 5, textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Tambah
        </Typography>
        <Typography align="center" variant="h2">
          Alat
        </Typography>
        <ButtonPrimary
          onClick={() => handleOpen('Tambah Alat', 0)}
          style={{ marginTop: 40, marginBottom: 5 }}
          label={'Masukkan Data'}
        />
      </div>
      <Drawer title={drawerTitle}>
        {step === 0 && (
          <>
            <InputLabel sx={{ marginTop: 2 }} id="jenis-masalah">
              Jenis Alat
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
              <MenuItem value={'Mesin Press'}>Mesin Press</MenuItem>
              <MenuItem value={'Conveyor'}>Conveyor</MenuItem>
              <MenuItem value={'Kendaraan'}>Kendaraan</MenuItem>
            </Select>
            <TextInput label={'Kapasitas'} type="number" />
            <ButtonPrimary
              onClick={() => handleOpen('Unggah Foto Alat', 1)}
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
