import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ADD_MESIN, DELETE_MESIN, GET_ALL_MESIN_MITRA, UPDATE_MESIN } from '../../api/mesin';
import dummybarang from '../../assets/dummy-barang.jpg';
import alat from '../../assets/illustation/recyle.png';
import AdupiXMayoraHead from '../../components/AdupiXMayoraHead';
import BarMobile from '../../components/BarMobile';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import DialogConfirm from '../../components/DialogConfirm';
import useAuth from '../../hooks/useAuth';
import useDrawer from '../../hooks/useDrawer';
import Form from './form';
import MoreMenu from './MoreMenu';

export default function TambahAlat() {
  const { auth } = useAuth();
  const { onOpen, Drawer, onClose } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedImg, setSelectedImg] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const { data, refetch } = useQuery('GET_ALL_MESIN_MITRA', () => GET_ALL_MESIN_MITRA(auth?.mitra?.mitraCode), {
    refetchOnWindowFocus: false,
  });

  const gudang = auth?.mitra?.gudang?.map((g) => {
    return { value: g?.usahaCode, label: g?.namaUsaha };
  });

  const handleAdd = async () => {
    setLoading(true);
    const response = await ADD_MESIN({ ...values, foto: '-' });
    // const response = await ADD_MESIN({ ...values, ktp: selectedImg });
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
    const response = await UPDATE_MESIN({ ...values, foto: '-' }, item.mesinCode);
    // const response = await UPDATE_MESIN({ ...values, ktp: selectedImg }, item.mesinCode);
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
    const response = await DELETE_MESIN(item.mesinCode);
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
    setDrawerTitle('Edit alat');
    onOpen();
  };

  const handleOnAdd = () => {
    setDrawerTitle('Tambah alat');
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
      <BarMobile title={'Tambah Alat'} />
      <AdupiXMayoraHead />
      <img alt="recyle logo" width="100%" src={alat} />
      <div style={{ marginTop: 5, textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Tambah
        </Typography>
        <Typography align="center" variant="h2">
          Alat
        </Typography>
        <ButtonPrimary onClick={handleOnAdd} style={{ marginTop: 50, marginBottom: 5 }} label={'Tambah Alat'} />
      </div>
      <div style={{ marginTop: 5, paddingLeft: 20, paddingRight: 20 }}>
        {list &&
          list.map((m, i) => (
            <Card key={i} style={{ marginBottom: 10 }}>
              <CardHeader
                action={<MoreMenu handleOnUpdate={() => handleOnUpdate(m)} handleOnDelete={() => handleOnDelete(m)} />}
                title={m?.jenisMesin}
                subheader={`Tanggal :  ${m?.createAt}`}
              />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 12 }}>{m?.jenisMesin}</Typography>
                    <Typography sx={{ fontSize: 10 }}>Status : {m?.statusKepemilikanMesin}</Typography>
                    <Typography sx={{ fontSize: 10 }}>Kapasitas : {m?.kapasitas}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <img
                        style={{ width: '40%' }}
                        src={m?.foto.length > 100 ? m?.foto : dummybarang}
                        alt={`img-barang`}
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
          isLoading={loading}
          gudang={gudang}
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
