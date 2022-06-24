import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { JUAL_SAMPAH } from '../../api/sampah';
import jualsampah from '../../assets/illustation/jual-sampah.png';

import AdupiXMayoraHead from '../../components/AdupiXMayoraHead';
import BarMobile from '../../components/BarMobile';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import useDrawer from '../../hooks/useDrawer';
import Form from './form';

export default function JualSampah() {
  const { onOpen, Drawer, onClose } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedImg, setSelectedImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const handleAdd = async () => {
    setLoading(true);
    // const response = await JUAL_SAMPAH({ ...values, nota: '-' });
    const response = await JUAL_SAMPAH({ ...values, nota: selectedImg });
    if (response.status === 422) {
      const asdf = response.data.errors;
      const keys = asdf && Object.keys(asdf);
      keys.forEach((key) => {
        enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
      });
    }
    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      setStep(0);
      onClose();
      // refetch();
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
    setLoading(false);
  };

  const handleOpen = (a, s) => {
    setDrawerTitle(a);
    setStep(s);
  };

  const handleOnAdd = () => {
    setDrawerTitle('Pilih Pembeli');
    onOpen();
    setStep(0);
  };

  return (
    <>
      <BarMobile title={'Jual Sampah'} />
      <AdupiXMayoraHead />
      <img alt="recyle logo" width="100%" src={jualsampah} />
      <div style={{ marginTop: 35, textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Masukan Data
        </Typography>
        <Typography align="center" variant="h2">
          Sampah Dijual
        </Typography>
        <ButtonPrimary onClick={handleOnAdd} style={{ marginTop: 50, marginBottom: 5 }} label={'Jual sampah'} />
      </div>
      <Drawer title={drawerTitle}>
        <Form
          isLoading={loading}
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
