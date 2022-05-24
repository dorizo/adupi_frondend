import { Typography } from '@mui/material';
import React, { useState } from 'react';
import Page from '../../components/Page';
import recyle from '../../assets/illustation/recyle.png';
import AdupiXMayoraHead from '../../components/AdupiXMayoraHead';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import ButtonSecondary from '../../components/Button/ButtonSecondary';
import useDrawer from '../../hooks/useDrawer';
import Masuk from './Masuk';
import Register from './Register';

export default function Welcome() {
  const { onOpen, Drawer } = useDrawer();
  const [action, setAction] = useState('Masuk');
  const [drawerTitle, setDrawerTitle] = useState('');
  const [step, setStep] = useState(1);
  const handleNext = (s, t) => {
    setStep(s);
    setDrawerTitle(t);
  };
  const handleOpen = (a) => {
    setAction(a);
    setDrawerTitle(a);
    onOpen();
  };
  return (
    <Page title="Welcome">
      <AdupiXMayoraHead />
      <img alt="recyle logo" width="100%" src={recyle} />
      <div style={{ textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography variant="h4">Selamat Datang Mitra Adupi</Typography>
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
        <Drawer title={drawerTitle}>
          {action === 'Masuk' ? <Masuk /> : <Register handleNext={handleNext} step={step} />}
        </Drawer>
      </div>
    </Page>
  );
}
