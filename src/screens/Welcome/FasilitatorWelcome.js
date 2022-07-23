import { Typography } from '@mui/material';
import React, { useState } from 'react';
import adupi from '../../assets/logo/adupi.png';
import AdupiXLeMineraleHead from '../../components/AdupiXLeMineraleHead';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import useDrawer from '../../hooks/useDrawer';
import Masuk from './Masuk';

export default function FasilitatorWelcome() {
  const { onOpen, Drawer } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
  const handleOpen = (a) => {
    setDrawerTitle(a);
    onOpen();
  };
  return (
    <>
      <AdupiXLeMineraleHead text />
      <img alt="recyle logo" width="100%" style={{ paddingLeft: 20, paddingRight: 20 }} src={adupi} />
      <div style={{ textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography variant="h4">Selamat Datang </Typography>

        <ButtonPrimary
          onClick={() => handleOpen('Masuk')}
          style={{ marginTop: 10, marginBottom: 15 }}
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
          <Masuk />
        </Drawer>
      </div>
    </>
  );
}
