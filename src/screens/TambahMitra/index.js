import { Typography } from '@mui/material';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { POST_REGISTRASI_MITRA } from '../../api/mitra';
import anggota from '../../assets/illustation/anggota.png';
import AdupiXMayoraHead from '../../components/AdupiXMayoraHead';
import BarMobile from '../../components/BarMobile';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import useDrawer from '../../hooks/useDrawer';
import Form from './form';

export default function TambahMitra() {
  const { onOpen, onClose, Drawer } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedImg, setSelectedImg] = useState(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleAdd = async (val) => {
    let newVal = {};
    val.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        if (obj[key] === '') {
          delete obj[key];
        }
      });
      newVal = { ...newVal, ...obj, ktp: btoa(selectedImg) };
    });
    const response = await POST_REGISTRASI_MITRA({
      ...newVal,
      tanggalLahir: format(newVal?.tanggalLahir, 'yyyy-MM-dd'),
    });
    if (response.status === 422) {
      const asdf = response.data.errors;
      const keys = asdf && Object.keys(asdf);
      keys.forEach((key) => {
        enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
      });
    }
    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
    setStep(0);
    onClose(false);
  };
  const handleOpen = (a, s) => {
    setDrawerTitle(a);
    setStep(s);
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
        <ButtonPrimary onClick={() => onOpen()} style={{ marginTop: 40, marginBottom: 5 }} label={'Tambah'} />
      </div>
      <Drawer title={drawerTitle || 'Tambah Mitra'}>
        <Form
          step={step}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          next={handleOpen}
          values={values}
          handleAdd={handleAdd}
          setValues={setValues}
        />
      </Drawer>
    </>
  );
}
