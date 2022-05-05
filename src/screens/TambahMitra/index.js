import React, { useState } from 'react';
import { InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import BarMobile from '../../components/BarMobile';
import anggota from '../../assets/illustation/anggota.png';
import AdupiXMayoraHead from '../../components/AdupiXMayoraHead';
import useDrawer from '../../hooks/useDrawer';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import TextInput from '../../components/TextInput';
import SelectInput from '../../components/SelectInput';

export default function TambahMitra() {
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
      <BarMobile title={'Tambah Mitra'} />
      <AdupiXMayoraHead />
      <img alt="recyle logo" style={{ paddingLeft: 20, paddingRight: 20 }} width="100%" src={anggota} />
      <div style={{ marginTop: 5, textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Tambah
        </Typography>
        <Typography align="center" variant="h2">
          Mitra
        </Typography>
        <ButtonPrimary
          onClick={() => handleOpen('Tambah Mitra', 0)}
          style={{ marginTop: 40, marginBottom: 5 }}
          label={'Tambah'}
        />
      </div>
      <Drawer title={drawerTitle}>
        {step === 0 && (
          <>
            <SelectInput
              label="Jenis Mitra"
              option={[
                { value: 'Lapak Press', label: 'Lapak Press' },
                { value: 'Lapak Bodong', label: 'Lapak Bodong' },
                { value: 'Lapak Giling', label: 'Lapak Giling' },
                { value: 'Bank Sampah', label: 'Bank Sampah' },
              ]}
            />
            <TextInput label={'NIK'} type="number" placeholder="Masukkan Nomor Induk Kependudukan" />
            <TextInput label={'No. HP'} type="number" placeholder="Masukkan Nomor Handphone" />
            <TextInput label={'Nama'} placeholder="Masukkan Nama" />
            <InputLabel sx={{ marginTop: 2 }} id="jenis-kelamin">
              Jenis Kelamin
            </InputLabel>
            <SelectInput
              label="Jenis Mitra"
              option={[
                { value: 'Laki-laki', label: 'Laki-laki' },
                { value: 'Perempuan', label: 'Perempuan' },
              ]}
            />
            <ButtonPrimary
              onClick={() => handleOpen('Alamat Mitra', 1)}
              style={{ marginTop: 30, marginBottom: 5 }}
              label={'Selanjutnya'}
            />
          </>
        )}
        {step === 1 && (
          <>
            <SelectInput label="Provinsi" option={[{ value: 'Lampung', label: 'Lampung' }]} />
            <SelectInput label="Kota/Kabupaten" option={[{ value: 'Lampung Selatan', label: 'Lampung Selatan' }]} />
            <SelectInput label="Kecamatan" option={[{ value: 'Natar', label: 'Natar' }]} />
            <SelectInput label="Kelurahan" option={[{ value: 'Sidosari', label: 'Sidosari' }]} />
            <TextInput label={'Alamat'} placeholde="Masukkan Alamat" rows={3} multiline />
            <ButtonPrimary
              onClick={() => handleOpen('Daftar Akun', 2)}
              style={{ marginTop: 30, marginBottom: 5 }}
              label={'Selanjutnya'}
            />
          </>
        )}
        {step === 2 && (
          <>
            <TextInput label={'Atur Usermname'} Placeholder="Masukan username" />
            <TextInput label={'Atur Password'} Placeholder="Masukan password" type="password" />
            <ButtonPrimary disabled type="submit" label="Selesai" />
          </>
        )}
      </Drawer>
    </>
  );
}
