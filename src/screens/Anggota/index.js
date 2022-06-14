import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ADD_ANGGOTA, DELETE_ANGGOTA, GET_ALL_ANGGOTA, UPDATE_ANGGOTA } from '../../api/anggota';
import AdupiXMayoraHead from '../../components/AdupiXMayoraHead';
import BarMobile from '../../components/BarMobile';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import DialogConfirm from '../../components/DialogConfirm';
import useDrawer from '../../hooks/useDrawer';
import Form from './form';
import MoreMenu from './MoreMenu';
import dummyKtp from '../../assets/dummy-ktp.jpg';

export default function Anggota() {
  const { onOpen, Drawer, onClose } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedImg, setSelectedImg] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const { data, refetch } = useQuery('GET_ALL_ANGGOTA', GET_ALL_ANGGOTA, {
    refetchOnWindowFocus: false,
  });

  const handleAdd = async () => {
    setLoading(true);
    // const response = await ADD_ANGGOTA({ ...values, ktp: '-' });
    const response = await ADD_ANGGOTA({ ...values, ktp: selectedImg });
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
    // const response = await UPDATE_ANGGOTA({ ...values, ktp: '-' }, item.anggotaCode);
    const response = await UPDATE_ANGGOTA({ ...values, ktp: selectedImg }, item.anggotaCode);
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
    const response = await DELETE_ANGGOTA(item.anggotaCode);
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
    setDrawerTitle('Edit Anggota');
    onOpen();
  };

  const handleOnAdd = () => {
    setDrawerTitle('Tambah Anggota');
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
      <BarMobile title={'Anggota'} />
      <AdupiXMayoraHead />
      {/* <img alt="recyle logo" width="100%" style={{ padding: 20 }} src={anggota} /> */}
      <div style={{ textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Anggota / Sumber
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
                title={li.nama}
                subheader={`NIK :  ${li.nik}`}
              />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        JK :{' '}
                      </Typography>
                      <Typography variant="caption">{li.jenisKelamin}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        No HP :{' '}
                      </Typography>
                      <Typography variant="caption">{li.noHp}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        Alamat :{' '}
                      </Typography>
                      <Typography variant="caption">{li.alamat}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <img
                        style={{ width: '50%' }}
                        src={`${process.env.REACT_APP_API_URL_SSL}assets/anggota/${li?.ktp}`}
                        alt={`img-barang`}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = dummyKtp;
                        }}
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
          isLoading={loading}
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
