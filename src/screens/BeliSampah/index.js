import React, { useState } from 'react';
import { InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { StaticTimePicker } from '@mui/x-date-pickers';
import BarMobile from '../../components/BarMobile';
import belisampah from '../../assets/illustation/beli-sampah.png';
import AdupiXMayoraHead from '../../components/AdupiXMayoraHead';
import useDrawer from '../../hooks/useDrawer';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import TextInput from '../../components/TextInput';

export default function BeliSampah() {
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
      <BarMobile title={'Beli Sampah'} />
      <AdupiXMayoraHead />
      <img alt="recyle logo" width="100%" src={belisampah} />
      <div style={{ textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Masukan Data
        </Typography>
        <Typography align="center" variant="h2">
          Pembelian Sampah
        </Typography>
        <ButtonPrimary
          onClick={() => handleOpen('Sampah Terkumpul', 0)}
          style={{ marginTop: 50, marginBottom: 5 }}
          label={'Masukkan Data'}
        />
      </div>
      <Drawer title={drawerTitle}>
        {step === 0 && (
          <>
            <TextInput label={'Berat Sampah'} type="number" />
            <InputLabel sx={{ marginTop: 2 }} id="sumber-sampah">
              Sumber Sampah
            </InputLabel>
            <Select
              fullWidth
              labelId="sumber-sampah"
              placeholder="Pilih Salah Satu"
              variant="standard"
              sx={{ marginBottom: 1 }}
              id="sumber-sampah-select-standard"
              label="Sumber Sampah"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Pemulung'}>Pemulung</MenuItem>
              <MenuItem value={'Rumah Tangga'}>Rumah Tangga</MenuItem>
              <MenuItem value={'Perkantoran'}>Perkantoran</MenuItem>
            </Select>
            <TextInput label={'Jenis Sampah'} />
            <ButtonPrimary
              onClick={() => handleOpen('Waktu Pengambilan Sampah', 1)}
              style={{ marginTop: 30, marginBottom: 5 }}
              label={'Selanjutnya'}
            />
          </>
        )}
        {step === 1 && (
          <>
            <StaticTimePicker
              ampm
              orientation="portrait"
              openTo="minutes"
              value={beliTime}
              onChange={(newValue) => {
                setBeliTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <ButtonPrimary
              onClick={() => handleOpen('Unggah Nota Timbangan', 2)}
              style={{ marginTop: 30, marginBottom: 5 }}
              label={'Selanjutnya'}
            />
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
            <ButtonPrimary type="submit" label="Selesai" />
          </>
        )}
      </Drawer>
    </>
  );
}
