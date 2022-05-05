import { Typography } from '@mui/material';
import React, { useState } from 'react';
import recyle from '../../assets/illustation/recyle.png';
import adupi from '../../assets/logo/adupi.png';
import mayora from '../../assets/logo/mayora.png';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import ButtonSecondary from '../../components/Button/ButtonSecondary';
import useDrawer from '../../hooks/useDrawer';
import Masuk from './Masuk';
import Register from './Register';

export default function Welcome() {
  const { onOpen, Drawer } = useDrawer();
  const [action, setAction] = useState('Masuk');
  const [drawerTitle, setDrawerTitle] = useState('');
  const handleOpen = (a) => {
    setAction(a);
    setDrawerTitle(a);
    onOpen();
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 10 }}>
        <img alt="adupi logo" width={65} src={adupi} />
        <img alt="mayora logo" width={60} height={53} src={mayora} />
      </div>
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
        <Drawer title={drawerTitle}>{action === 'Masuk' ? <Masuk /> : <Register />}</Drawer>
      </div>
    </>
  );
}
