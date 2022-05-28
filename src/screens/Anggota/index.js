import { InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import anggota from '../../assets/illustation/anggota.png';
import AdupiXMayoraHead from '../../components/AdupiXMayoraHead';
import BarMobile from '../../components/BarMobile';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import TextInput from '../../components/TextInput';
import useDrawer from '../../hooks/useDrawer';

export default function Anggota() {
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
      <img alt="recyle logo" width="100%" style={{ padding: 20 }} src={anggota} />
      <div style={{ textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Tambah
        </Typography>
        <Typography align="center" variant="h2">
          Anggota/Sumber
        </Typography>
        <ButtonPrimary
          onClick={() => handleOpen('Data Pribadi', 0)}
          style={{ marginTop: 50, marginBottom: 5 }}
          label={'Tambah'}
        />
      </div>
      <Drawer title={drawerTitle}>
        {step === 0 && (
          <>
            <TextInput label={'NIK'} type="number" placeholder="Masukkan Nomor Induk Kependudukan" />
            <TextInput label={'No. HP'} type="number" placeholder="Masukkan Nomor Handphone" />
            <TextInput label={'Nama'} placeholder="Masukkan Nama" />
            <InputLabel sx={{ marginTop: 2 }} id="jenis-kelamin">
              Jenis Kelamin
            </InputLabel>
            <Select
              fullWidth
              labelId="jenis-kelamin"
              placeholder="Pilih Salah Satu"
              variant="standard"
              sx={{ marginBottom: 1 }}
              id="jenis-kelamin-select-standard"
              label="Jenis Kelamin"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Laki-laki'}>Laki-laki</MenuItem>
              <MenuItem value={'Perempuan'}>Perempuan</MenuItem>
            </Select>
            <TextInput label={'Alamat'} placeholde="Masukkan Alamat" rows={3} multiline />
            <ButtonPrimary
              onClick={() => handleOpen('Unggah Foto KTP', 1)}
              style={{ marginTop: 30, marginBottom: 5 }}
              label={'Selanjutnya'}
            />
          </>
        )}
        {step === 1 && (
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
