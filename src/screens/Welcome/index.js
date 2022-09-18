import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import Page from '../../components/Page';
import recyle from '../../assets/illustation/recyle.png';
import AdupiXLeMineraleHead from '../../components/AdupiXLeMineraleHead';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import ButtonSecondary from '../../components/Button/ButtonSecondary';
import useDrawer from '../../hooks/useDrawer';
import Masuk from './Masuk';
import Register from './Register';
import { REGISTRASI_MITRA_NEW } from '../../api/mitra';
import LoadingOverlayComponent from '../../components/LoadingOverlay';

export default function Welcome() {
  const { enqueueSnackbar } = useSnackbar();
  const { onOpen, Drawer, onClose } = useDrawer();
  const [action, setAction] = useState('Masuk');
  const [closeAble, setCloseAble] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
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
      setLoadingRegister(true);
      // failed base 64 image only
      // const mesin = values?.mesin.map((n) => {
      //   const newww = { ...n, foto: '-' };
      //   return newww;
      // });
      const response = await REGISTRASI_MITRA_NEW({ ...values, ...val },setProgress);
      // const response = await REGISTRASI_MITRA_NEW({ ...values, ...val, mesin, ktp: '-', foto: '-' });
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
      setLoadingRegister(false);
    }
    setLoading(false);
  };
  const handleOpen = (a) => {
    setAction(a);
    setDrawerTitle(a);
    onOpen();
  };
  return (
    <Page title="Welcome">
      <AdupiXLeMineraleHead />
      <img alt="recyle logo" width="100%" src={recyle} />
      <div style={{ textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography variant="h4">Selamat Datang Mitra GESN</Typography>
        <Typography align="center" style={{ wordWrap: 'break-word', width: 240, margin: 'auto' }}>
          Sebelum masuk ke aplikasi {'\n'} silahkan daftar dulu ya
        </Typography>
        <ButtonPrimary
          onClick={() => handleOpen('Data Pribadi')}
          style={{ marginTop: 5, marginBottom: 5 }}
          label={'Daftar Akun Baru'}
        />
        <ButtonSecondary
          onClick={() => handleOpen('Masuk')}
          style={{ marginTop: 10, marginBottom: 5 }}
          label={'Masuk'}
        />
        <Typography variant="caption">
          Dengan masuk ataupun mendaftar, berarti kamu telah setuju dengan{' '}
          <a href="#" style={{ color: 'red' }}>
            Syarat dan Ketentuan{' '}
          </a>
          serta{' '}
          <a href="#" style={{ color: 'red' }}>
            Kebijakan Privasi
          </a>
        </Typography>
        <Drawer closeable={closeAble} title={drawerTitle}>
          {action === 'Masuk' ? (
            <Masuk />
          ) : (
            <Register values={values} isLoading={loading} handleNext={handleNext} step={step} />
          )}
        </Drawer>
      </div>
      <LoadingOverlayComponent text={"proses "+Progress} loading={loadingRegister} />
    </Page>
  );
}
