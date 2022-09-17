import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { POST_REGISTRASI_MITRA } from '../../api/mitra';
import anggota from '../../assets/illustation/tambahMitras.svg';
import AdupiXLeMineraleHead from '../../components/AdupiXLeMineraleHead';
import BarMobile from '../../components/BarMobile';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import useDrawer from '../../hooks/useDrawer';
import Step1 from '../Welcome/Register/Step1';
import Step2 from '../Welcome/Register/Step2';
import Step3 from '../Welcome/Register/Step3';
import Step4 from '../Welcome/Register/Step4';
import Step6 from '../Welcome/Register/Step6';

export default function TambahMitra() {
  const { enqueueSnackbar } = useSnackbar();
  const { onOpen, Drawer, onClose } = useDrawer();
  const [loading, setLoading] = useState(false);
  const [closeAble, setCloseAble] = useState(true);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({});
  const [Progress, setProgress] = useState(0);

  const handleNext = async (s, t, val) => {
    setLoading(true);
    if (s !== 0) {
      setStep(s);
      setCloseAble(false);
      setDrawerTitle(t);
      setValues({ ...values, ...val });
    }
    if (s === 0) {
      const response = await POST_REGISTRASI_MITRA({ ...values, ...val },setProgress);
      // const response = await POST_REGISTRASI_MITRA({ ...values, ...val, ktp: '-', foto: '-' });
      if (response.status === 422) {
        const asdf = response.data.errors;
        const keys = asdf && Object.keys(asdf);
        keys.forEach((key) => {
          enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
        });
      }
      if (response.status === 200) {
        await enqueueSnackbar(response.data.message, { variant: 'success' });
        onClose();
      }
      if (response.status === 400) {
        await enqueueSnackbar(response.data.message, { variant: 'error' });
      }
      if (response.status === 500) {
        await enqueueSnackbar('Internal server error', 'error');
      }
      setStep(1);
    }
    setLoading(false);
  };
  const handleOpen = (a) => {
    setDrawerTitle(a);
    onOpen();
    setProgress(0);
  };
  return (
    <>
      <BarMobile title={'Tambah Mitra'} />
      <AdupiXLeMineraleHead />
      <img alt="recyle logo" style={{ paddingLeft: 20, paddingRight: 20 }} width="100%" src={anggota} />
      <div style={{ marginTop: 5, textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
       
        <ButtonPrimary
          onClick={() => handleOpen('Tambah Mitra')}
          style={{ marginTop: 40, marginBottom: 5 }}
          label={'Tambah'}
        />
      </div>
      <Drawer title={Progress===0?drawerTitle || 'Tambah Mitra':Progress}>
        {step === 1 && <Step1 values={values} isLoading={loading} handleNext={handleNext} />}
        {step === 2 && <Step2 values={values} isLoading={loading} handleNext={handleNext} />}
        {step === 3 && <Step3 values={values} isLoading={loading} handleNext={handleNext} />}
        {step === 4 && <Step4 values={values} isLoading={loading} handleNext={handleNext} />}
        {step === 5 && <Step6 values={values} isLoading={loading} handleNext={handleNext} />}
      </Drawer>
    </>
  );
}
