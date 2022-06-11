import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ADD_MASALAH, DELETE_MASALAH, GET_ALL_MASALAH, UPDATE_MASALAH } from '../../api/masalah';
import dummyMasalah from '../../assets/dummy-masalah.png';
import masalah from '../../assets/illustation/masalah.png';
import AdupiXMayoraHead from '../../components/AdupiXMayoraHead';
import BarMobile from '../../components/BarMobile';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import DialogConfirm from '../../components/DialogConfirm';
import useDrawer from '../../hooks/useDrawer';
import Form from './form';
import MoreMenu from './MoreMenu';

export default function Masalah() {
  const { onOpen, Drawer, onClose } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedImg, setSelectedImg] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const { data, refetch } = useQuery('GET_ALL_MASALAH', GET_ALL_MASALAH, {
    refetchOnWindowFocus: false,
  });

  const handleAdd = async () => {
    setLoading(true);
    const response = await ADD_MASALAH({ ...values, foto: '-' });
    // const response = await ADD_MASALAH({ ...values, ktp: selectedImg });
    if (response.status === 422) {
      const asdf = response.data.errors;
      const keys = asdf && Object.keys(asdf);
      keys.forEach((key) => {
        enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
      });
    }
    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      refetch();
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
    setStep(0);
    onClose();
    setLoading(false);
  };
  const handleUpdate = async () => {
    setLoading(true);
    const response = await UPDATE_MASALAH({ ...values, foto: '-' }, item.masalahCode);
    // const response = await UPDATE_MASALAH({ ...values, ktp: selectedImg }, item.masalahCode);
    if (response.status === 422) {
      const asdf = response.data.errors;
      const keys = asdf && Object.keys(asdf);
      keys.forEach((key) => {
        enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
      });
    }
    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      refetch();
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
    setStep(0);
    setItem(null);
    onClose();
    setLoading(false);
  };
  const handleDelete = async () => {
    setLoading(true);
    const response = await DELETE_MASALAH(item.masalahCode);
    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      refetch();
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
    setItem(null);
    setLoading(false);
    setAlertOpen(false);
  };

  const handleOpen = (a, s) => {
    setDrawerTitle(a);
    setStep(s);
  };
  const handleOnUpdate = (item) => {
    setItem(item);
    setStep(0);
    setSelectedImg(item.ktp);
    setDrawerTitle('Edit Masalah');
    onOpen();
  };

  const handleOnAdd = () => {
    setDrawerTitle('Tambah Masalah');
    onOpen();
    setStep(0);
    setItem(null);
  };
  const handleOnDelete = (item) => {
    setItem(item);
    setAlertOpen(true);
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
    setItem(null);
  };
  const list = data && data.data.data;

  return (
    <>
      <BarMobile title={'Masalah'} />
      <AdupiXMayoraHead />
      <img alt="recyle logo" width="100%" src={masalah} />
      <div style={{ marginTop: 5, textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Laporkan
        </Typography>
        <Typography align="center" variant="h2">
          Masalah
        </Typography>
        <ButtonPrimary onClick={handleOnAdd} style={{ marginTop: 50, marginBottom: 5 }} label={'Tambah'} />
      </div>

      <div style={{ marginTop: 5, paddingLeft: 20, paddingRight: 20 }}>
        {list &&
          list.map((li, i) => (
            <Card key={i} style={{ marginBottom: 10 }}>
              <CardHeader
                action={
                  <MoreMenu handleOnUpdate={() => handleOnUpdate(li)} handleOnDelete={() => handleOnDelete(li)} />
                }
                title={li?.jenisMasalah}
                subheader={`Tanggal :  ${li?.createAt}`}
              />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Deskripsi :{' '}
                    </Typography>
                    <Typography variant="caption">{li?.deskripsi}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <img
                        style={{ width: '50%' }}
                        src={li?.foto.length > 100 ? li?.foto : dummyMasalah}
                        alt={`img-ktp`}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
      </div>
      <Drawer title={drawerTitle}>
        <Form
          item={item}
          step={step}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          next={handleOpen}
          values={values}
          handleAdd={handleAdd}
          onUpdate={handleUpdate}
          setValues={setValues}
        />
      </Drawer>
      {alertOpen && (
        <DialogConfirm
          processing={loading}
          alertClose={handleAlertClose}
          alertOpen={alertOpen}
          handleConfirm={handleDelete}
          text={'Yakin Ingin Hapus'}
        />
      )}
    </>
  );
}
